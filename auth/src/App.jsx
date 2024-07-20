import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Private from './pages/Private'
import PrivateRoute from "./components/PrivateRoute"
import { useState,useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import './App.css'
import Spinner from 'react-bootstrap/Spinner';

const App = () => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if (user) {
        setUser(user)
        setLoading(false)
        return
      }
      setUser(null)
      setLoading(false)
    })
    return ()=>unsubscribe()
  }, [])


  if (loading) {
    return (<h2>Loading..........</h2>)
  }
  



  return (
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Home/>}/>
      <Route path='/Private' element={<PrivateRoute user={user}>
        <Private/>
        </PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
