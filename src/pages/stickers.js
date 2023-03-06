import { UserContext } from '@/context/userContext'
import { findStickersByUserId } from '@/db/stickers'
import { Container, Flex, Heading } from '@chakra-ui/react'
import { CldImage } from 'next-cloudinary'
import { useCallback, useContext, useEffect, useState } from 'react'

export default function stickers () {
  const { userContext } = useContext(UserContext)
  const [stickers, setStickers] = useState()

  const findStickers = useCallback(async () => {
    const userId = userContext?.user?.id
    const response = await findStickersByUserId({ userId })

    setStickers(response)
  }, [userContext])

  useEffect(() => {
    if (userContext) {
      findStickers()
    }
  }, [findStickers, userContext])

  const handleClick = ({ event, width, name }) => {
    const url = event.target.src.replace('w_100', `w_${width}`)

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const urlBlob = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = urlBlob
        a.download = name
        a.click()
        URL.revokeObjectURL(urlBlob)
      })
  }

  if (stickers?.length === 0) {
    return (
      <Container>
        <Heading as='h2'>It looks like you don't have any stickers yet. Go to the editor and create some!</Heading>
      </Container>
    )
  }

  return (
    <Container>
      <Heading as='h1' mb={5}>My Stickers</Heading>
      <Flex gap={10} border='1px' p={10} wrap='wrap'>
        {stickers &&
          stickers.map(({ public_id: publicId, name, width }) => (
            <CldImage
              style={{ cursor: 'pointer' }}
              key={publicId}
              src={publicId}
              alt={name}
              width={100}
              height={100}
              onClick={(event) => handleClick({ event, width, name })}
            />
          ))}
      </Flex>
    </Container>
  )
}
