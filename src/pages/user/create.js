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
            status : 'active'
        };

        if (!formDataObject?.username) {
            window.alert('username cannot be empty')
            return
        }

        if (!formDataObject?.email) {
            window.alert('email cannot be empty')
            return
        }

        if (!formDataObject?.name) {
            window.alert('name cannot be empty')
            return
        }

        if (!formDataObject?.password) {
            window.alert('password cannot be empty')
            return
        }

        const { data } = await axios(`http://localhost:8000/api/v1/auth/sign-up`, {
            method: 'post',
            data: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (data.status === 'error') {
            window.alert(data.data.message);
        } else {
            window.alert('User Register Success')
        }

    }

    const roles = ['learner', 'provider', 'administrator'];
    return (
        <>
            <PageTitle>Create Courses</PageTitle>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <Label>
                    <span>Username</span>
                    <Input className="mt-1" required onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            username: event.target.value
                        })
                    }} placeholder="Username..." />
                </Label>
                <Label className="mt-4">
                    <span>Email</span>
                    <Input required className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            email: event.target.value
                        })
                    }} placeholder="email@gmail.com" />
                </Label>
                <Label className="mt-4">
                    <span>Fullname</span>
                    <Input className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            name: event.target.value
                        })
                    }} placeholder="Victorie Clarie" />
                </Label>

                <Label className="mt-4">
                    <span>Password</span>
                    <Input className="mt-1" onChange={(event) => {
                        setFormDataObject({
                            ...formDataObject,
                            password: event.target.value
                        })
                    }} type="password" placeholder="Victorie Clarie" />
                </Label>

                <Label className="mt-4">
                    <span>User Role</span>
                    {roles.length <= 0 ? <span>none</span> : (
                        <Select onChange={(event) => {
                            setFormDataObject({
                                ...formDataObject,
                                userRole : event.target.value
                            })
                        }} className="mt-1">
                            {
                                roles.map((role) => {
                                    return (
                                        <option key={role} value={role}>{role}</option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </Label>

                <Button onClick={async (e) => await submit(e)} className="p-5 mt-4">
                    <span>Submit</span>
                </Button>
            </div>
        </>
    )
}

export default Forms
