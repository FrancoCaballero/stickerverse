import { Link } from '@chakra-ui/next-js'
import { Button, Flex, Text } from '@chakra-ui/react'

export default function Home () {
  return (
    <>

      <Flex direction='column' gap={5} as='main' maxW='3xl'>
        <Text fontSize='3xl'>
          Create your own custom text messaging stickers and personalize your conversations with our easy-to-use tool. Join our community of sticker creators and start customizing your chats today!
        </Text>
        <Flex gap={5}>
          <Link href='/singup'>
            <Button as='span' colorScheme='whatsapp'>Sing Up</Button>
          </Link>
        </Flex>

      </Flex>
    </>
  )
}
