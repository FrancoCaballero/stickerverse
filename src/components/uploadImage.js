import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import { CldUploadWidget } from 'next-cloudinary'
import React from 'react'

export function UploadImage ({ handleUploadImage }) {
  const handleUpload = (result) => {
    console.log(result)
    const { public_id: publicId, original_filename: name, height: originalHeight, width: originalWidth } = result.info
    handleUploadImage({ publicId, name, originalHeight, originalWidth })
  }

  return (
    <Flex direction='column' justify='center' gap={5} height={500}>
      <Heading as='h1'>Upload your image and start editing!</Heading>
      <CldUploadWidget uploadPreset='sbzimigh' onUpload={handleUpload}>
        {({ open }) => {
          function handleOnClick (e) {
            e.preventDefault()
            open()
          }
          return (
            <Button onClick={handleOnClick}>
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </Flex>
  )
}
