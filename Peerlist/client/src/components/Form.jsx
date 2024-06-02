import React from 'react'

const Form = () => {
  return (
    <div>
        <form action="" className='mt-4 md:mt-[3vh]'>
            <input 
            type="text" 
            id="question-input"
            placeholder='Ask your question' 
            className='px-4 py-2 w-[30vh] md:w-[40vh] lg:w-[100vh] border border-[#1E5128] rounded-2xl mr-2'/>
            <input 
            type="submit"
            value="Ask"
            className='submit-button px-4 py-2 border border-[#1E5128] rounded-xl text-[#1E5128] hover:bg-[#1E5128] hover:text-[#F9F9E0]' />
        </form>
    </div>
  )
}

export default Form