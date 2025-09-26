import React, { useEffect, useState } from 'react'
export default function Programs() {

  const [programs, setPrograms] = useState([])

  const [loading, setLoading] = useState(true)



  useEffect(() => {
    fetch('http://localhost:8000/programs')
      .then(response => response.json())
      .then((data) =>{
        setPrograms(data)
      })   
      .catch(error => console.error('Error fetching programs:', error)).finally( () => setLoading(false));
  }, [])

  return (
    <div className='max-w-7xl mx-auto p-5 mt-16'>
      <h3 className='my-5'>Our Programs</h3>
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
            {programs.slice(0, 3)?.map((program) => (
              <div key={program.id} className="bg-white shadow-md rounded-lg hover:shadow-xl transition">
                <img src={program?.image} alt={program.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{program.title}
                  </h2>
                  <p>Teacher : {program?.teacher}</p>
                  <p className="text-gray-500 truncate">{program.description}</p>
                  <strong className="text-[#b04ba2]">price : ${program.price}</strong>
                  <p className="text-[#b04ba2]">Lessons : {program.lessons} | Hours : {program.hours}</p>
                </div>
              </div>
            ))}
          </div>
      )}
      </div>
  )
}
