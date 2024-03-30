import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from './Component/Login/Login'
import Profile  from './Component/Profile/Profile';
import Register from './Component/Register/Register';
import EditProfile from './Component/Profile/Editprofile';
function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/edit' element={<EditProfile />} />
        </Routes>
    </div>
  )
}

export default App