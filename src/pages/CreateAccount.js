import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button } from '@windmill/react-ui'
import axios from 'axios';

function Login() {
  const [formDataObject, setFormDataObject] = useState({});


  const submit = async (e) => {

    e.preventDefault()

    const body = {
      ...formDataObject,
      userRole : 'learner'
    };

    if(!formDataObject?.username) {
      window.alert('username cannot be empty')
      return
    }

    if(!formDataObject?.email) {
      window.alert('email cannot be empty')
      return
    }

    if(!formDataObject?.name) {
      window.alert('name cannot be empty')
      return
    }

    if(!formDataObject?.password) {
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
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>Username</span>
                <Input className="mt-1" onChange={(e) => {
                  setFormDataObject({
                    ...formDataObject,
                    username: e.target.value
                  })
                }} type="text" placeholder="myusername" />
              </Label>
              <Label className="mt-4">
                <span>Email</span>
                <Input className="mt-1" onChange={(e) => {
                  setFormDataObject({
                    ...formDataObject,
                    email: e.target.value
                  })
                }} type="email" placeholder="john@doe.com" />
              </Label>
              <Label className="mt-4">
                <span>Fullname</span>
                <Input className="mt-1" type="text" onChange={(e) => {
                  setFormDataObject({
                    ...formDataObject,
                    name: e.target.value
                  })
                }} placeholder="Victoria Clarie" />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" onChange={(e) => {
                  setFormDataObject({
                    ...formDataObject,
                    password: e.target.value
                  })
                }} placeholder="***************" type="password" />
              </Label>

              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button onClick={async (e) => await submit(e)} className="mt-4" block layout="outline">
                Create account
              </Button>

              <hr className="my-8" />

              {/* <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
