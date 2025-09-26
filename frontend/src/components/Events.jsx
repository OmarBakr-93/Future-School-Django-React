import React, { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';


export default function Events() {

  const [events, setEvents] = useState([])
  
    const [loading, setLoading] = useState(true)
  
  
  
    useEffect(() => {
      fetch('http://localhost:8000/events')
        .then(response => response.json())
        .then((data) =>{
          setEvents(data)
        })   
        .catch(error => console.error('Error fetching programs:', error)).finally( () => setLoading(false));
    }, [])
  
  return (
    <div className='max-w-7xl mx-auto p-5 mt-16'>
      <h3 className='my-5'>Our Events</h3>
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
            {events.slice(0, 3)?.map((event) => (
              <div key={event.id} className="bg-white shadow-md rounded-lg hover:shadow-xl transition">
                <img src={event?.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{event.title}
                  </h2>
                  <p className="text-gray-500 mb-2 truncate">{event.description}</p>
                  <div className='flex items-center justify-between '>
                  <strong className="flex items-center font-bold text-[#b04ba2] gap-3"><Clock /> {event.time_from}- {event.time_to}</strong>
                  </div>
                  <p className="text-[#b04ba2] mt-3 flex items-center text-sm "><MapPin /> {event.location}</p>
                </div>
              </div>
            ))}
          </div>
      )}
      </div>
  )
}
