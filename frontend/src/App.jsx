import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import EditNote from './pages/EditNote'
import MainLayout from './layout/MainnLayout'
function App() {
  

  return (
    <>
    <Routes>
      <Route element={<MainLayout />}>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/create' element={<CreateNote />}></Route>
      <Route path='/notes/edit/:id' element={<EditNote />}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
