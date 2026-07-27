import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/' element={<Home />}></Route>
    </Routes>
    </>
  )
}

export default App
