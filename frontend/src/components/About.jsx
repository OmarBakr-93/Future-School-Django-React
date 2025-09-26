import about from '../assets/about.jpg'


export default function About() {
  return (
    <div className="max-w-7xl mx-auto p-4 mt-16 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center">
        <img src={about} alt="About" className="rounded-lg" />
        </div>
        <div className="flex flex-col justify-center items-center">
        <h3>About Us</h3>
        <h1 className='mt-3'>We Learn Smart Way To Build Bright Future For Your Children</h1>
        <p className='text-gray-400 mt-3'>At our school, we are committed to providing a nurturing and supportive environment for children to develop their skills and knowledge in a safe and welcoming atmosphere.</p>
        </div>
    </div>
  )
}
