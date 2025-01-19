import { ReactNode } from 'react'


export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="service-card bg-white p-6 rounded-lg shadow-md">
      <div className="service-icon bg-[#FC403A] p-3 rounded-full w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <div className="line w-12 h-1 bg-[#FC403A] mb-4"></div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}