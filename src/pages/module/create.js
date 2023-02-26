import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import { Input, Button, Label, Select, Textarea } from '@windmill/react-ui'

import axios from 'axios'

function Forms() {
    const [formDataObject, setFormDataObject] = useState({});

    const submit = async (e) => {

        e.preventDefault()

        const body = {
            ...formDataObject
        };

        if (!formDataObject?.name) {
            window.alert('module name cannot be empty')
            return
        }

        const userToken = localStorage.getItem('userToken')
        const { data } = await axios(`http://localhost:8000/api/v1/module`, {
            method: 'post',
            data: {
                data : body
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${userToken}`
            }
        })

        if (data.status === 'error') {
            window.alert(data.data.message);
        } else {
            window.alert('Module Create Success')
        }

    }
    return (
        <>
            <PageTitle>Create Module</PageTitle>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <Label>
                    <span>Module Name</span>
                    <Input className="mt-1" required onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            name: event.target.value
                        })
                    }} placeholder="Module Name..." />
                </Label>

                <Button onClick={async (e) => await submit(e)} className="p-5 mt-4">
                    <span>Submit</span>
                </Button>
            </div>
        </>
    )
}

export default Forms
