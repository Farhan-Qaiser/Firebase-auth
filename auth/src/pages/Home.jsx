import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../firebase"
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignup, setIsSignup] = useState(true)
  const navigate = useNavigate()


  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }
  function handleSignup() {
    if (!email||!password) {
      setError('Email or Password Missing')
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
      const user = userCredentials.user
      console.log(user)
    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      setError(errorMessage)
      console.log({errorCode,errorMessage})
    })
  }
  function handleSignin() {
    if (!email||!password) {
      setError('Email or Password Missing')
    }
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
      const user = userCredentials.user
      console.log(user)
      navigate('./Private')
    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      setError(errorMessage)
      console.log({errorCode,errorMessage})
    })
  }
  function handleMethodChnge() {
    setIsSignup(!isSignup)
  }

  return (
    <div className='main'>
      <form>
        {isSignup && <legend>Sign Up</legend>}
        {!isSignup && <legend>Sign In</legend>}
        <fieldset>
          <ul>
            <li>
              <input type="email" name="email" id="email" placeholder='Email' onChange={handleEmail}/>
            </li>
            <li>
              <input type="password" name="password" id="password" placeholder='Password' onChange={handlePassword}/>
            </li>
          </ul>
          {error && <p>{error}</p>}
          {isSignup && (
            <button type='button' onClick={handleSignup}>Sign Up</button>
          )}
          {!isSignup && (
            <button type='button' onClick={handleSignin}>Sign In</button>
          )}
        </fieldset>
      </form>
      {isSignup && <a onClick={handleMethodChnge}>Already have an account?Sign In</a>}
      {!isSignup && <a onClick={handleMethodChnge}>Dont have an account?Sign Up</a>}
    </div>
  )
}

export default Home
