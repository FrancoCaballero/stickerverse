import { UserContext } from '@/context/userContext'
import { singUpWithEmail } from '@/db/auth'
import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
// import { FaGithub } from 'react-icons/fa'

export default function login () {
  const router = useRouter()
  const { setUserContext } = useContext(UserContext)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { email, password } = form

  const handleChange = (event) => {
    setForm(prevalue => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { session, user } = await singUpWithEmail({ email, password })

    setUserContext({ session, user })
    router.push('/stickers')
  }

  // const handleSignUpWithGithub = async () => {
  //   const response = await singUpWithGitHub()

  //   console.log(response)
  // }

  return (
    <Flex as='main' direction='column' gap={5}>

      <Heading as='h1'>Create Account</Heading>

      <Flex onSubmit={handleSubmit} as='form' direction='column' gap={3}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input name='email' type='email' value={email} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name='password' type='password' value={password} onChange={handleChange} />
        </FormControl>

        <Button type='submit' colorScheme='whatsapp'>Sign Up</Button>
      </Flex>

      {/* <Button rightIcon={<FaGithub />} onClick={handleSignUpWithGithub}>Sign Up With Github</Button> */}
    </Flex>
  )
}
