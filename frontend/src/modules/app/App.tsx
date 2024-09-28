import React, { ReactElement, useState } from 'react'
import './styles.css'
import {
  signInWithFacebook,
  signInWithGitHub,
  signInWithGoogle,
  signInWithMicrosoft,
  signInWithTwitter,
} from '../firebase'

type User = {
  email: string
  firstName: string
  lastName: string
  birthday: string
}

export function App(): ReactElement {
  const [user, setUser] = useState<User>()

  const handleLogin = async (
    providerName: 'google' | 'microsoft' | 'facebook' | 'github' | 'twitter'
  ) => {
    let signInMethod

    switch (providerName) {
      case 'google':
        signInMethod = signInWithGoogle
        break
      case 'microsoft':
        signInMethod = signInWithMicrosoft
        break
      case 'facebook':
        signInMethod = signInWithFacebook
        break
      case 'github':
        signInMethod = signInWithGitHub
        break
      case 'twitter':
        signInMethod = signInWithTwitter
        break
      default:
        return
    }

    try {
      const { result, credential } = await signInMethod()
      const accessToken = credential?.accessToken
      const secret = credential?.secret
      const userName = (result as any)?._tokenResponse?.screenName

      const firebaseToken = await result.user.getIdToken()

      const data = {
        firebaseToken,
        accessToken,
        secret,
        userName,
      }

      const response = await fetch('http://localhost:8080/auth/login/firebase', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      //
      const user = await response.json()
      setUser(user)
    } catch (error) {
      console.error(`Error during ${providerName} Sign-In:`, error)
    }
  }

  return (
    <div className='app-container'>
      <h1>Firebase auth testing</h1>
      <button onClick={() => handleLogin('google')}>Sign in with Google</button>
      <button onClick={() => handleLogin('microsoft')}>Sign in with Microsoft</button>
      <button onClick={() => handleLogin('github')}>Sign in with GitHub</button>
      <button onClick={() => handleLogin('twitter')}>Sign in with Twitter</button>
      {/* <button onClick={() => handleLogin('facebook')}>Sign in with Facebook</button> */}
      <hr />
      {user ? (
        <div className='user-data-container'>
          <div className='user-data-field'>
            <label>
              <b>First Name: </b>
            </label>
            <span>{user.firstName}</span>
          </div>
          <br />

          <div className='user-data-field'>
            <label>
              <b>Last Name: </b>
            </label>
            <span>{user.lastName}</span>
          </div>
          <br />

          <div className='user-data-field'>
            <label>
              <b>Email: </b>
            </label>
            <span>{user.email}</span>
          </div>
          <br />

          <div className='user-data-field'>
            <label>
              <b>Birthday: </b>
            </label>
            <span>{user.birthday ? new Date(user.birthday).toLocaleDateString() : '-'}</span>
          </div>
          <br />
        </div>
      ) : (
        'No user data'
      )}
    </div>
  )
}
