import React, { useState, useEffect } from 'react'

import PageTitle from '../../../components/Typography/PageTitle'
import SectionTitle from '../../../components/Typography/SectionTitle'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../../icons'

import response from '../../../utils/demo/tableData'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Tables() {

    const history = useHistory();
    // setup pages control for every table
    const [pageTable2, setPageTable2] = useState(1);

    // setup data for every table
    const [dataTable2, setDataTable2] = useState([]);
    const [resultsPerPage, setResultPerPage] = useState(10);
    const [totalResults, setTotalResult] = useState(0);
    const [courses, setCourses] = useState([]);

    // pagination change control
    function onPageChangeTable2(p) {
        setPageTable2(p)
    }

    const fetchCourses = async () => {
        const url = `http://localhost:8000/api/v1/course`;
        const token = localStorage.getItem('userToken');
        const { data } = await axios(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (data.status === 'success') {
            const paginatedData = data.data.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)
            setTotalResult(data.data.length)
            setCourses(paginatedData);
        }
    }

    const deleteCourse = async (id) => {

        const url = `http://localhost:8000/api/v1/course/${id}`;
        const token = localStorage.getItem('userToken');

        console.log('url >> ', url);
        const { data } = await axios(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        console.log('data delete >> ', data);

        if (data.status === 'success') {
            window.alert('success delete course')
            window.location.reload();
        }
    }


    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        fetchCourses()
        // setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])

    return (
        <>
            <PageTitle>Courses</PageTitle>
            <SectionTitle>List of available courses</SectionTitle>

            <Button onClick={() => history.replace('/app/courses/master/create')} className="p-5 mb-4">
                <span>Add new Course</span>
            </Button>

            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Course Name</TableCell>
                            <TableCell>Modules</TableCell>
                            <TableCell>Keyword</TableCell>
                            <TableCell>Learner</TableCell>
                            <TableCell>Course By</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Avatar className="hidden mr-3 md:block" src={course.coverImage} alt="User avatar" />
                                        <div>
                                            <p className="font-semibold">{course.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{course.description}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{course.courseModules.map((v) => v.module.name).join(', ')}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{course.keyword.join(', ')}</span>
                                    {/* <Badge type={user.status}>{user.status}</Badge> */}
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{course.learner.map((v) => v.name).join(', ')}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{course.provider.name}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit">
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                        <Button onClick={async () => await deleteCourse(course._id)} layout="link" size="icon" aria-label="Delete">
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={onPageChangeTable2}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>
        </>
    )
}

export default Tables
