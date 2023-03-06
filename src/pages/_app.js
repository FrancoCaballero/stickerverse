import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@/components/layout'
import { UserContext } from '@/context/userContext'
import { useEffect, useState } from 'react'
import { getSession } from '@/db/auth'

export default function App ({ Component, pageProps }) {
  const [userContext, setUserContext] = useState()

  useEffect(() => {
    setUserContext(getSession())
  }, [])

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UserContext.Provider>
  )
}
