import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from '@chakra-ui/next-js'
import { UserContext } from '@/context/userContext'
import { signOut } from '@/db/auth'
import { useRouter } from 'next/router'

const CustomLink = ({ href, children, ...restOfProps }) => {
  return (
    <Link {...restOfProps} href={href} color='white' _hover={{ opacity: '0.5' }}>
      {children}
    </Link>
  )
}

export default function Nav () {
  const router = useRouter()
  const { userContext, setUserContext } = useContext(UserContext)

  const signOutSession = async () => {
    await signOut()
    setUserContext(null)
    router.push('/')
  }

  const LogInItems = () => {
    return (
      <>
        <CustomLink href='/stickers'>
          Stickers
        </CustomLink>
        <CustomLink href='/editor'>
          Editor
        </CustomLink>
        <Menu>
          <MenuButton as={Button}>
            {userContext?.user?.email}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={signOutSession}>Sing Out</MenuItem>
          </MenuList>
        </Menu>
      </>
    )
  }

  return (
    <Flex as='nav' bg='gray.900' padding={5} justifyContent='space-between'>
      <Box>
        <CustomLink href={userContext ? '/stickers' : '/'} fontSize='3xl' fontWeight='bold'>
          STICKER<Text as='span' color='blue.500'>VERSE</Text>
        </CustomLink>
      </Box>

      <Flex gap={3} alignItems='center'>
        {userContext
          ? <LogInItems />
          : <CustomLink href='/login'>Sing in</CustomLink>}

      </Flex>
    </Flex>
  )
}
