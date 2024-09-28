import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth'
import { auth } from './config'

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
  provider.addScope('https://www.googleapis.com/auth/user.birthday.read')

  const result = await signInWithPopup(auth, provider)

  const credential = GoogleAuthProvider.credentialFromResult(result)

  return { result, credential }
}

export const signInWithMicrosoft = async () => {
  const provider = new OAuthProvider('microsoft.com')
  const result = await signInWithPopup(auth, provider)

  const credential = OAuthProvider.credentialFromResult(result)

  return { result, credential }
}

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider()
  provider.addScope('email')
  const result = await signInWithPopup(auth, provider)

  const credential = FacebookAuthProvider.credentialFromResult(result)

  return { result, credential }
}

export const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider()
  const result = await signInWithPopup(auth, provider)

  const credential = GithubAuthProvider.credentialFromResult(result)

  return { result, credential }
}

export const signInWithTwitter = async () => {
  const provider = new TwitterAuthProvider()
  const result = await signInWithPopup(auth, provider)

  const credential = TwitterAuthProvider.credentialFromResult(result)

  return { result, credential }
}
