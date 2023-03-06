import { UserContext } from '@/context/userContext'
import { addSticker } from '@/db/stickers'
import { overlays } from '@/utils/overlays'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Container, Flex, FormControl, FormLabel, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from '@chakra-ui/react'
import { CldImage } from 'next-cloudinary'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export function ImageEditor ({ name, publicId, originalHeight, originalWidth }) {
  const router = useRouter()
  const { userContext } = useContext(UserContext)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [overlayId, setOverlayId] = useState()
  const [loadingImage, setLoadingImage] = useState(false)
  const [intervalId, setIntervalId] = useState(null)
  const [form, setForm] = useState({
    width: originalWidth,
    height: originalHeight,
    faceDetection: true,
    topText: '',
    bottomText: '',
    pixelateFace: false,
    overlayX: 10,
    overlayY: 10,
    overlayWidth: 300,
    fontSize: 90
  })

  const { width, height, faceDetection, topText, bottomText, fontSize, pixelateFace, overlayX, overlayY, overlayWidth } = form

  useEffect(() => {
    if (loadingImage) {
      const modifiedImage = document.querySelector('#modifiedImage')

      if (intervalId !== null) {
        clearInterval(intervalId)
      }
      const newIntervalId = setInterval(() => {
        // eslint-disable-next-line no-undef
        const img = new Image()
        img.src = modifiedImage?.src
        img.onload = async () => {
          setLoadingImage(false)
          clearInterval(intervalId)
        }
      }, 500)
      setIntervalId(newIntervalId)
    }
  }, [loadingImage, intervalId])

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target

    let newValue = type === 'checkbox' ? checked : value

    if (type === 'number') {
      newValue = newValue === '' ? null : Number(newValue)
    }

    setForm(prevalue => {
      return {
        ...prevalue,
        [name]: newValue
      }
    })
  }

  const handleSliderChange = ({ name, value }) => {
    setForm(prevalue => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }

  const handleRemoveBakcground = () => {
    setRemoveBackground(true)
    setLoadingImage(true)
  }

  const handleOverlay = ({ publicId }) => {
    setOverlayId(publicId)
  }

  const onLoad = (event) => {
    if (removeBackground) {
      setLoadingImage(false)
    }
  }

  const upload = async () => {
    const modifiedImage = document.querySelector('#modifiedImage')
    const response = await fetch(`/api/image?url=${modifiedImage.src}`).then(res => res.json())

    const { public_id: publicId } = response.data
    const { id: userId } = userContext.user

    await addSticker({ userId, publicId, name, height, width })
    router.push('/stickers')
  }

  let overlay = []

  if (topText) {
    overlay = [{
      text: {
        color: 'white',
        fontFamily: 'Source Sans Pro',
        fontSize,
        fontWeight: 'bold',
        text: topText,
        stroke: true,
        border: '20px_solid_black'
      },
      position: {
        x: 0,
        y: 0,
        gravity: 'north'
      }
    }]
  }

  if (bottomText) {
    const newText = {
      text: {
        color: 'white',
        fontFamily: 'Source Sans Pro',
        fontSize,
        fontWeight: 'bold',
        text: bottomText,
        stroke: true,
        border: '20px_solid_black'
      },
      position: {
        x: 0,
        y: 0,
        gravity: 'south'
      }
    }
    if (overlay?.length === 0) {
      overlay = [newText]
    } else {
      overlay.push(newText)
    }
  }

  if (overlayId) {
    const newOverlay = {
      publicId: overlayId,
      position: {
        x: overlayX ?? 1,
        y: overlayY ?? 1,
        gravity: 'faces'
      },
      width: overlayWidth
    }
    if (overlay?.length === 0) {
      overlay = [newOverlay]
    } else {
      overlay.push(newOverlay)
    }
  }

  return (
    <Container maxW='6xl'>
      <Button
        onClick={handleRemoveBakcground}
        isDisabled={removeBackground}
        mb={5}
      >
        Remove Background
      </Button>
      <Stack direction={['column', 'row']} gap={10} border='1px' p={10} borderRadius='lg' borderColor='gray.600'>
        <Flex flexDir='column' gap={3} width='60%'>

          <Accordion defaultIndex={[0]} allowMultiple border='1px' borderColor='gray.600' width='400px'>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Sizes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Stack direction={['column', 'row']} justifyContent='space-between'>
                  <Checkbox defaultChecked name='faceDetection' value={faceDetection} onChange={handleChange}>Face Detection</Checkbox>
                  <Checkbox name='pixelateFace' value={pixelateFace} onChange={handleChange}>Pixelate Face</Checkbox>
                </Stack>
                <Stack direction={['column', 'row']}>
                  <FormControl>
                    <FormLabel>Width</FormLabel>
                    <Input name='width' value={width} type='number' onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Height</FormLabel>
                    <Input name='height' value={height} type='number' onChange={handleChange} />
                  </FormControl>
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Text Properties
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <FormControl>
                  <FormLabel>Top Text</FormLabel>
                  <Input name='topText' value={topText} type='text' onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Bottom Text</FormLabel>
                  <Input name='bottomText' value={bottomText} type='text' onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Font Size</FormLabel>
                  <Input name='fontSize' value={fontSize} type='number' onChange={handleChange} />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border='1px' borderColor='gray.600'>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Overlays
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Flex direction='column' gap={2} p={3}>
                  <Flex p={3} gap={2} wrap='wrap'>
                    {overlays.map(({ name, publicId }) => (
                      <Box key={publicId} border='1px' rounded='lg'>
                        <CldImage
                          src={publicId}
                          alt={name}
                          width={50}
                          height={50}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleOverlay({ publicId })}
                        />
                      </Box>
                    ))}
                  </Flex>
                  <FormControl>
                    <FormLabel>Horizontal</FormLabel>
                    <Slider aria-label='slider-ex-1' defaultValue={0} min={-400} max={400} name='overlayX' value={overlayX} onChange={(value) => handleSliderChange({ value, name: 'overlayX' })}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Vertical</FormLabel>
                    <Slider aria-label='overlayY' defaultValue={0} min={-400} max={400} name='overlayY' value={overlayY} onChange={(value) => handleSliderChange({ value, name: 'overlayY' })}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Width</FormLabel>
                    <Input name='overlayWidth' value={overlayWidth} type='number' onChange={handleChange} />
                  </FormControl>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

        </Flex>
        <Container minW={300} maxW={800} minH={300} maxH={800}>
          {loadingImage && (
            <Flex h={500} w={500} justifyContent='center' alignItems='center'>
              <Text>Loading...</Text>
            </Flex>
          )}
          <CldImage
            id='modifiedImage'
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
            width={width <= 100 ? 100 : width}
            height={height <= 100 ? 100 : height}
            src={publicId}
            alt={name}
            removeBackground={removeBackground}
            gravity={faceDetection ? 'faces' : ''}
            crop={faceDetection ? 'thumb' : 'limit'}
            pixelateFaces={pixelateFace}
            overlays={overlay}
            onLoad={onLoad}
            hidden={loadingImage}
          />
        </Container>
      </Stack>
      <Flex justifyContent='end' mt={3}>
        <Button onClick={upload}>Create Sticker</Button>
      </Flex>
    </Container>
  )
}
