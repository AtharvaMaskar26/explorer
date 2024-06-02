import React from 'react'

const Project = ({project_name, upvotes, description, link}) => {

  return (
    <div className='w-[40vh] lg:w-[100vh] text-[#1E5128]'>
      <div className="p-5">
        <div className="relative my-1 rounded-md border border-[#1E5128]">
          <input type="checkbox" className="peer absolute left-0 top-0 h-16 w-full cursor-pointer bg-red-300 p-5 opacity-0" />
          <div className="project-title font-semibold cursor-pointer rounded-md bg-white p-5">{project_name} {upvotes} upvotes</div>
          <div className="absolute right-3 top-3 rotate-90 rounded-full border p-2 shadow-md duration-500 peer-checked:-rotate-90 peer-checked:rounded-full peer-checked:bg-[#BFF6C3] peer-checked:text-[#1E5128] peer-checked:transition-all peer-checked:duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className="project-title font-medium max-h-0 max-w-[30vh] md:max-w-[200vh] overflow-hidden transition-all duration-500 peer-checked:max-h-screen">
            <p className="p-4 text-[#1E5128]"><strong><u>Project Name:</u></strong> {project_name}</p>
            <p className="p-4 block md:hidden lg:hidden text-[#1E5128]"><strong><u>Description:</u></strong> {description.slice(0, 120)}...</p>
            <p className="p-4 hidden md:block lg:block text-[#1E5128]"><strong><u>Description:</u></strong> {description}</p>
            <p className="p-4 text-[#1E5128]"><strong><u>Project Link:</u></strong> <a href={link} target="_blank">{link}</a></p>
            <p className="p-4 text-[#1E5128]"><strong><u>Number of Upvotes:</u></strong> {upvotes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project