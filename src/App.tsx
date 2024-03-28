import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from './Component/Login/Login'
import Profile  from './Component/Profile/Profile';
import Register from './Component/Register/Register';
function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </div>
  )
}

export default App