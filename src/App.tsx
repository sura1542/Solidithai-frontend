import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'

function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </div>
  )
}

export default App