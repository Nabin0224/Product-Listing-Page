import './App.css'
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PageLayout from './components/Layout'


function App() {
  
  return (
    <>
   <div className="flex flex-col">
   <Routes>
      <Route path='/' element = { <PageLayout/>} />
    </Routes>
   </div>
    </>
  )
}

export default App
