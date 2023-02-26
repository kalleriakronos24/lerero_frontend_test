import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import { Input, Button, Label, Select, Textarea } from '@windmill/react-ui'

import axios from 'axios'

function Forms() {
    const [formDataObject, setFormDataObject] = useState({});

    const submit = async (e) => {

        e.preventDefault()

        const body = {
            ...formDataObject,
        };

        const userToken = localStorage.getItem('userToken')
        const { data } = await axios(`http://localhost:8000/api/v1/activity`, {
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
            window.alert('Activity Create Success')
        }

    }
    return (
        <>
            <PageTitle>Create Activity</PageTitle>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <Label>
                    <span>Activity Name</span>
                    <Input className="mt-1" required onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            name: event.target.value
                        })
                    }} placeholder="Activity Name..." />
                </Label>
                <Label className="mt-4">
                    <span>File URL</span>
                    <Input required className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            fileUrl: event.target.value
                        })
                    }} placeholder="fileurl.com" />
                </Label>
                <Label className="mt-4">
                    <span>File Ext</span>
                    <Input className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            fileExt: event.target.value
                        })
                    }} placeholder=".pdf" />
                </Label>

                <Label className="mt-4">
                    <span>Description</span>
                    <Input className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            description: event.target.value
                        })
                    }} placeholder="some desc..." />
                </Label>


                <Button onClick={async (e) => await submit(e)} className="p-5 mt-4">
                    <span>Submit</span>
                </Button>
            </div>
        </>
    )
}

export default Forms
