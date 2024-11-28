'use client'

import { useState } from 'react'
import { LineChart } from '@/components/line-chart'

export default function Dashboard() {
  const [videoUrl, setVideoUrl] = useState('')
  const [vehicleStats, setVehicleStats] = useState({
    car: 0,
    motorcycle: 0,
    truck: 0,
    Bus: 0
  })

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Camera 1</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Section */}
          <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full rounded-lg"
              />
            ) : (
              <div className="text-gray-500">No video feed available</div>
            )}
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Stats</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Count</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.car}</div>
                  <div className="text-gray-600">Car</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.motorcycle}</div>
                  <div className="text-gray-600">Motorbike</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.truck}</div>
                  <div className="text-gray-600">Truck</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{vehicleStats.Bus}</div>
                  <div className="text-gray-600">Bus</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Real Time Sensor Display</h3>
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

