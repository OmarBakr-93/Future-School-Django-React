import { useState } from 'react'
import welcome from '../assets/welcome.jpg'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const usenavigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) {
        if (data.username) {
          throw new Error(`${data.username[0]}`)}
        if (data.email) {
            throw new Error(`${data.email[0]}`)}
      }
      localStorage.setItem('token', data.token)
      await fetch('http://localhost:8000/profiles/', {
        headers: {
          'Authorization': `Token ${data.token}`
        }}
      ).then(res => res.json())
      .then(profileData => {
        if (Array.isArray(profileData) && profileData.length > 0) {
          localStorage.setItem('role', profileData[0].role)
        }
      })
      .catch(error => console.error('Error fetching profile:', error));

      setMessage('Registration successful')
      setTimeout(() => {
        usenavigate('/')
      }, 2000)
    } catch (error) {
      setMessage(error.message)
    }
  }
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      <div className='flex-1 flex items-center justify-center p-8 bg-gray-50'>
        <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-6'>
          <h3 className='mb-6 text-center'>
            Create Account
          </h3>
          <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
            <input 
            type="text"
            placeholder='Username'
            name='username'
            value={form.username}
            onChange={handleChange}
            className='border rounded-md p-3 focus:ring focus:ring-blue-300'
            />
            <input 
            type="text"
            placeholder='first name'
            name='first_name'
            value={form.first_name}
            onChange={handleChange}
            className='border rounded-md p-3 focus:ring focus:ring-blue-300'
            />
            <input 
            type="text"
            placeholder='last name'
            name='last_name'
            value={form.last_name}
            onChange={handleChange}
            className='border rounded-md p-3 focus:ring focus:ring-blue-300'
            />
            <input 
            type="email"
            placeholder='Email'
            name='email'
            value={form.email}
            onChange={handleChange}
            className='border rounded-md p-3 focus:ring focus:ring-blue-300'
            />
            <input 
            type="text"
            placeholder='Password'
            name='password'
            value={form.password}
            onChange={handleChange}
            className='border rounded-md p-3 focus:ring focus:ring-blue-300'
            />
            <button type='submit' className='text-white py-3 rounded-lg'>
              Register
            </button>
          </form>
          {message && (<p className='mt-4 text-center text-grey-700'>{message}</p>)}
        </div>
      </div>
      <div className='flex-1 hidden md:flex'>
        <img src={welcome} alt="Register" className='w-full h-full object-cover'/>
      </div>
    </div>
  )
}
