import React, {useState} from 'react'
import axios from 'axios';

import Project from './Project';
import OneLineAnswer from './OneLineAnswer'

const Form = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track button click


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/query', { input });
      setMessage(response.data.projects);
      setIsButtonClicked(true); // Set button clicked state to true
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error: Could not reach the server.');
      }
    }
  };
  return (
    <div>
        <form onSubmit={handleSubmit} className='mt-4 md:mt-[3vh]'>
            <input 
            type="text" 
            id="question-input"
            placeholder='Ask your question' 
            onChange={(e) => setInput(e.target.value)}
            className='px-4 py-2 w-[30vh] md:w-[40vh] lg:w-[100vh] border border-[#1E5128] rounded-2xl mr-2'/>
            <input 
            type="submit"
            value="Ask"
            className='submit-button px-4 py-2 border border-[#1E5128] rounded-xl text-[#1E5128] hover:bg-[#BFF6C3] hover:text-[#1E5128]' />
        </form>
        <div className="flex flex-col items-center justify-center mt-[4vh]">
          { isButtonClicked ? message[0].length == 4 ? 
          message.map((project, index) => (
              <Project
              key={index}
              project_name = {project[0]}
              description = {project[1]}
              link = {project[2]}
              upvotes = {project[3]}
            />
          ))
          : 
          <OneLineAnswer
            response={message[0][0]}
          />
          :
          ""
          }
        </div>
    </div>
  )
}

export default Form