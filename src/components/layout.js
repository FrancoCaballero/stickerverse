import { Flex } from '@chakra-ui/react'
import Nav from './nav'

export function Layout ({ children }) {
  return (
    <>
      <Nav />
      <Flex mt={10} justifyContent='center'>
        {children}
      </Flex>
      {/* <footer>
        footer
      </footer> */}
    </>
  )
}
