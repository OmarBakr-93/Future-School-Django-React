import React, { useEffect, useState } from 'react'


export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  
    const [loading, setLoading] = useState(true)
  
  
  
    useEffect(() => {
      fetch('http://localhost:8000/teachers')
        .then(response => response.json())
        .then((data) =>{
          setTeachers(data)
        })   
        .catch(error => console.error('Error fetching programs:', error)).finally( () => setLoading(false));
    }, [])
  
  return (
    <div className='max-w-7xl mx-auto p-5 mt-16'>
      <h3 className='my-5'>Our Teachers</h3>
      {/* Skeleton loading */}
      {loading ?(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {[1, 2, 3].map((i) => <div key={i} className="animate-pulse bg-white shadow-md overflow-hidden rounded-lg">
        <div className='w-full h-48 bg-gray-300'></div>
          <div className='p-4'>
            <div className='h-4 bg-gray-300 rounded w-3/4 mb-4'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4 mb-4'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4 mb-4'></div>
          </div>
        </div>
      )}
      </div>
      ): (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {teachers.slice(0, 3)?.map((teacher) => (
              <div key={teacher.id} className="bg-white shadow-md rounded-lg hover:shadow-xl transition">
                <img src={teacher?.image} alt={teacher.name} className="w-full h-50 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{teacher.name}
                  </h2>
                  <p>Subject : {teacher?.subject}</p>
                  <p className="text-gray-500 truncate">{teacher.description}</p>
                </div>
              </div>
            ))}
          </div>
      )}
      </div>
  )
}
