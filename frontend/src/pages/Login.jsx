import { useState } from 'react'
import welcome from '../assets/welcome.jpg'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      if (!response.ok) {
          throw new Error("Username or Password is incorrect")
      } 
      const data = await response.json()

      localStorage.setItem('token', data.token)
      const profileUser = await fetch('http://localhost:8000/profiles/', {
        headers: {
          'Authorization': `Token ${data.token}`
        }
      })
      const profileData = await profileUser.json()
      if (profileUser.length > 0) {
        localStorage.setItem('Role', profileData[0].role)
      }
      setMessage('Login successful')
      setTimeout(() => {
        navigate('/')
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
            type="username"
            placeholder='Username'
            name='username'
            value={form.username}
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
              Login
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
