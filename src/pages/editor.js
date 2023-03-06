import { ImageEditor } from '@/components/imageEditor'
import { UploadImage } from '@/components/uploadImage'
import { supabase } from '@/db/supabase'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'

export default function editor () {
  const [image, setImage] = useState()

  const handleUploadImage = (response) => {
    setImage({ ...response })
  }

  console.log(supabase)

  return (
    <Flex flexDir='column' gap={5}>
      {image
        ? <ImageEditor {...image} />
        : <UploadImage handleUploadImage={handleUploadImage} />}
    </Flex>
  )
}
