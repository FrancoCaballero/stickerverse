import { supabase } from './supabase'

export const saveSession = (session) => {
  localStorage.setItem('session', JSON.stringify(session))
}

export const getSession = () => {
  let session = localStorage.getItem('session')
  session = session ? JSON.parse(session) : null
  if (!session) return null
  const user = session?.user
  return { session, user }
}

export async function singInWithEmail ({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw error
  } else {
    saveSession(data.session)
    return data
  }
}

export const getUser = async () => {
  const { session } = (await supabase.auth.getSession().data) || getSession()

  if (session) {
    const { user } = session
    return { user }
  } else {
    return null
  }
}

export async function singUpWithEmail ({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    throw error
  } else {
    saveSession(data.session)
    return data
  }
}

export async function singUpWithGitHub () {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })

  return { data, error }
}

export async function signOut () {
  await supabase.auth.signOut()
  localStorage.removeItem('session')
}
