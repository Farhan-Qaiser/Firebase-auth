import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'

const Private = () => {

  function handleSignout() {
    signOut(auth)
    alert('Signed Out Successfully')
  }


  return (
    <div>
      <h1>Private Page</h1>
      <button type="button" onClick={handleSignout}>Sign Out</button>
    </div>
  )
}

export default Private
