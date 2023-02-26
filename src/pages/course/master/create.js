import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/Typography/PageTitle'
import SectionTitle from '../../../components/Typography/SectionTitle'
import { Input, HelperText, Button, Label, Select, Textarea } from '@windmill/react-ui'

import { MailIcon } from '../../../icons'
import axios from 'axios'

function Forms() {
    const [activities, setActivities] = useState([]);
    const [modules, setModules] = useState([]);
    const [learners, setLearners] = useState([]);
    const [formDataObject, setFormDataObject] = useState({
        modules : [],
        learners : []
    });
    const [multipleModules, setMultipleModules] = useState([]);
    const [temp, setTemp] = useState([]);
    const fetchModulesAndActivity = async () => {

        const url = 'http://localhost:8000/api/v1/module';
        const usertoken = localStorage.getItem('userToken');
        const { data } = await axios(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            }
        });

        let moduleArr = null;
        let activityArr = null;

        const result = data
        if (result.status === 'success') {
            const data = result.data.map((module, index) => {
                return {
                    id: module._id,
                    name: module.name,
                    selected: false
                }
            });
            setModules(data);
            moduleArr = data;
        };


        // fetch activities
        const urlActivity = 'http://localhost:8000/api/v1/activity';
        const { data: dataActivity } = await axios(urlActivity, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            }
        });

        const resultActivity = dataActivity
        if (resultActivity.status === 'success') {
            const data = resultActivity.data.map((activity, index) => {
                return {
                    id: activity._id,
                    name: activity.name,
                    selected: false
                }
            });
            setActivities(data);
            activityArr = data;
        };

        if (moduleArr.length > 0 && activityArr.length > 0) {
            const object = {
                modules: moduleArr,
                activities: activityArr
            };
            setMultipleModules([object])
            setFormDataObject({
                modules : [{
                    moduleId : moduleArr[0].id,
                    activities : activityArr
                }]
            })
        };


    }

    const fetchLearners = async () => {
        const url = 'http://localhost:8000/api/v1/user?userRole=learner';
        const usertoken = localStorage.getItem('userToken');
        const { data } = await axios(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usertoken}`
            }
        });

        const result = data;
        if (result.status === 'success') {
            const data = result.data.map((user, index) => {
                return {
                    id: user._id,
                    name: user.name,
                    selected: false
                }
            });
            setLearners(data);
        };
    };


    const handleChangeActivities = (id, index) => {

        setFormDataObject({
            ...formDataObject,
            modules : [...formDataObject.modules.map((v,i) => {
                if(i === index) {
                    return {
                        ...v,
                        activities : v.activities.map((activity) => {
                            if(activity.id === id) {
                                return {
                                    ...activity,
                                    selected : !activity.selected
                                } 
                            } else {
                                return activity
                            }
                        })
                    }
                } else {
                    return v
                }
            })]
        })
    };

    const handleChangeModule = (index, value) => {
        const checkIndex = multipleModules.some((v, i) => i === index);
        if (checkIndex) {
            setFormDataObject({
                ...formDataObject,
                modules: [...formDataObject.modules.map((v,i) => {
                    if(i === index) {
                        return {
                            ...v,
                            moduleId : value
                        }
                    } else {
                        return v
                    }
                })]
            })
        }
    };

    const handleChangeLearners = (id) => {
        const check = learners.some((learner, index) => learner.id === id);
        if (check) {
            const newLearners = learners.map((v) => {
                if (v.id === id) {
                    return {
                        ...v,
                        selected: !v.selected
                    }
                } else {
                    return v
                }
            });
            setLearners(newLearners);
        };
    };


    const submit = async () => {

        const modulesArr = formDataObject.modules.map((module) => {
            return {
                module : module.moduleId,
                activities : module.activities.filter((activity) => activity.selected === true)
            }
        });
        const selectedLearners = learners.filter((learner) => learner.selected === true);
        const object = {
            ...formDataObject,
            keyword : formDataObject.keyword.split(','),
            modules : modulesArr,
            learner : selectedLearners.length > 0 ? selectedLearners.map((v) => v.id) : [],
            provider : localStorage.getItem('userId')
        };

        if(!formDataObject.name) {
            window.alert('Course name cannot be empty');
            return
        }

        if(!formDataObject.coverImage) {
            window.alert('Cover Image cannot be empty');
            return
        }

        if(object.learner.length <= 0) {
            window.alert('Learners cannot be empty. please select atleast one');
            return
        }

        const userToken = localStorage.getItem('userToken');
        const url = 'http://localhost:8000/api/v1/course';
        const { data } = await axios(url, {
            method: 'post',
            data : {
                data : object
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        console.log('data >> ', data);

        if(data.status === 'success') {
            window.alert('success')
        }

    };

    const fetchAll = async () => {
        await fetchModulesAndActivity();
        await fetchLearners();
    }

    useEffect(() => {
        fetchAll();
    }, [])
    return (
        <>
            <PageTitle>Create Courses</PageTitle>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <Label>
                    <span>Course Name</span>
                    <Input className="mt-1" required onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            name: event.target.value
                        })
                    }} placeholder="Course name..." />
                </Label>
                {
                    multipleModules.length > 0 ? multipleModules.map((object, objectIndex) => {
                        return (
                            <>
                                <Label key={objectIndex} className="mt-4">
                                    <span>Module</span>
                                    {object.modules.length <= 0 ? <span>none</span> : (
                                        <Select onChange={(event) => handleChangeModule(objectIndex, event.target.value)} className="mt-1">
                                            {
                                                object.modules.map((module) => {
                                                    return (
                                                        <option key={module.id} value={`${module.id}`}>{module.name}</option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    )}
                                </Label>
                                <div className='flex flex-col mt-2'>
                                    <Label>
                                        <span>Activities</span>
                                        {
                                            object.activities.length <= 0 ? <span>none</span> : object.activities.map((activity, activityIndex) => {
                                                return (
                                                    <Label key={activity.id} className='text-white'>
                                                        <input type="checkbox" value={activity.id} onChange={() => handleChangeActivities(activity.id, objectIndex)} /> {activity.name}
                                                    </Label>
                                                )
                                            })
                                        }
                                    </Label>
                                </div>
                            </>
                        )
                    }) : <span>- Loading -</span>
                }


                <Button onClick={async () => {
                    setMultipleModules([...multipleModules, Object.assign({}, ...multipleModules)])
                    setFormDataObject({
                        ...formDataObject,
                        modules : [...formDataObject.modules, Object.assign({}, ...formDataObject.modules)]
                    })
                }} className="p-5 mt-4">
                    <span>Add More Module</span>
                </Button>

                <Label className="mt-4">
                    <span>Cover Image (url)</span>
                    <Input required className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            coverImage: event.target.value
                        })
                    }} placeholder="imageurl.com" />
                </Label>
                <Label className="mt-4">
                    <span>Keywords (use comma to seperate)</span>
                    <Input className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            keyword: event.target.value
                        })
                    }} placeholder="kw1,kw2" />
                </Label>
                <div className='flex flex-col mt-2'>
                    <Label>
                        <span>Learners</span>
                        {
                            learners.length <= 0 ? <span>none</span> : learners.map((v) => {
                                return (
                                    <Label key={v.id} className='text-white'>
                                        <input type="checkbox" onChange={() => handleChangeLearners(v.id)} value={v.id} /> {v.name}
                                    </Label>
                                )
                            })
                        }
                    </Label>
                </div>
                <Label className="mt-4">
                    <span>Description</span>
                    <Textarea required onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            description: event.target.value
                        })
                    }} className="mt-1" rows="3" placeholder="Enter some long description." />
                </Label>
                <Button onClick={async () => await submit()} className="p-5 mt-4">
                    <span>Submit</span>
                </Button>
            </div>
        </>
    )
}

export default Forms
