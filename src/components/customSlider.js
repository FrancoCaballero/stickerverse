import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export function CustomSlider ({ min, max, defaultValue, handleChangeValue, ...restOfProps }) {
  const [sliderValue, setSliderValue] = useState(defaultValue)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    handleChangeValue(sliderValue)
  }, [sliderValue, handleChangeValue])

  return (
    <Slider
      {...restOfProps}
      id='slider'
      defaultValue={defaultValue}
      min={min}
      max={max}
      colorScheme='teal'
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
        25%
      </SliderMark>
      <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
        50%
      </SliderMark>
      <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
        75%
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='teal.500'
        color='white'
        placement='top'
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  )
}
