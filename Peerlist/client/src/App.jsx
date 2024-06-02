import { useState } from 'react'
import './App.css'

// Importing Components
import Heading from './components/Heading'
import Form from './components/Form'

function App() {

  return (
    <main className='flex flex-col items-center h-screen'>
      <Heading />
      <Form />
    </main>
  )
}

export default App
