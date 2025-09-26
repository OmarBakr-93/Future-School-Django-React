import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const [open, setOpen] = useState(false)

  const [role, setRole] = useState(null)

  const navigate = useNavigate()
  const handleClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:8000/profiles/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRole(data[0].role)
        }
      })
      .catch(error => console.error('Error fetching profile:', error));
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="text-sm text-white w-full">
    <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
       <p>New Academic Year Admission Now Open <span className="underline underline-offset-2">Apply Now</span></p>
    </div>
   <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow">

       <a href="/">
            <h2 className="text-2xl font-bold">Fut<span className="text-violet-500">ure</span>School</h2>
       </a>
       <ul className="hidden md:flex items-center space-x-8 md:pl-28">
           <li><a href="#">Home</a></li>
           <li><a href="#">Services</a></li>
           <li><a href="#">Portfolio</a></li>
           <li><a href="#">Pricing</a></li>
       </ul>
       <div className='flex items-center gap-4'>
        {!role ? (
            <>
              <button onClick={() => navigate('/login')} className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all">Log in</button>
              <button onClick={() => navigate('/register')}  className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all">Register</button>
            </>
        ): (
          <>
          {role === 'student' && (
            <button onClick={() => navigate('/grades')}  className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all">My Grades</button>
          )}
          <button onClick={handleLogout}  className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all">Logout</button>
          </>
        )}
       

       </div>
       

       <button onClick={handleClick} aria-label="menu-btn" type="button" className="menu-btn inline-block md:hidden active:scale-90 transition">
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
               <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
           </svg>
       </button>
        {open && (
          <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-lg">
              <li><a href="#" className="text-sm">Home</a></li>
              <li><a href="#" className="text-sm">Services</a></li>
              <li><a href="#" className="text-sm">Portfolio</a></li>
              <li><a href="#" className="text-sm">Pricing</a></li>
          </ul>

          <button type="button" className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full">
              Log in
          </button>
      </div>
        )
        }
       
   </nav>
</div>

  )
}
