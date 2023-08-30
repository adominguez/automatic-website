'use client'
import React, { useState } from 'react'
import { Button, Card, Typography, Input, Checkbox } from '@/app/components/MaterialComponents'
// import { useNavigate } from "react-router-dom";
import { useAuthContext, useToken } from '@/app/hooks/auth'
import { redirect } from 'next/navigation'

const LoginPage = () => {
  // const navigate = useNavigate();
  const { setNewToken } = useToken()
  const { setUser } = useAuthContext()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const onFinish = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const value = {
        identifier: form.email,
        password: form.password
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })

      const data = await response.json()
      if (data?.error) {
        throw data?.error
      } else {
        // set the token
        setNewToken(data.jwt)

        // set the user
        setUser(data.user)
        redirect('/admin')
      }
    } catch (error) {
      console.error(error)
      setError(error?.message ?? 'Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const handlerChange = (e) => {
    const { value, name } = e.target
    setForm((oldValue) => ({
      ...oldValue,
      [name]: value
    }))
  }

  return (
    <Card className='items-center justify-center p-6'>
    <Typography variant="h4" color="blue-gray">
      Login
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Enter your details to register.
    </Typography>
    <form onSubmit={onFinish} className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
      <div className="flex flex-col gap-6 mb-4">
        <Input size="lg" label="Email" name="email" onChange={handlerChange} />
        <Input type="password" size="lg" label="Password" name="password" onChange={handlerChange} />
      </div>
      <Checkbox
        label={
          <Typography
            variant="small"
            color="gray"
            className="flex items-center font-normal"
          >
            I agree the
            <a
              href="#"
              className="font-medium transition-colors hover:text-gray-900"
            >
              &nbsp;Terms and Conditions
            </a>
          </Typography>
        }
        containerProps={{ className: '-ml-2.5' }}
      />
      <Button type="submit" className="mt-6" fullWidth>
        Login {isLoading && '...'}
      </Button>
      <Typography color="gray" className="mt-4 font-normal text-center">
        Already have an account?{' '}
        <a href="#" className="font-medium text-gray-900">
          Sign In
        </a>
      </Typography>
    </form>
  </Card>
  )
}

export default LoginPage
