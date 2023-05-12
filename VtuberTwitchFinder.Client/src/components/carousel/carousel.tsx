import {
    Box,
    BoxProps,
    Flex,
    FlexProps,
    IconButton,
    IconButtonProps,
    useColorModeValue
} from "@chakra-ui/react";
import {KeenSliderOptions, useKeenSlider} from 'keen-slider/react'
import {forwardRef} from "react";

export const Carousel = forwardRef<HTMLDivElement, FlexProps>(function Carousel(props, ref) {
    return (
        <Flex ref={ref}
              className={"chakra-carousel"}
              overflow={"hidden"}
              position={"relative"}
              userSelect={"none"}
              {...props}/>
    )
})

export function CarouselSlide(props: BoxProps) {
    return (
        <Box className={"chakra-carousel__slide"}
             position={"relative"}
             overflow={"hidden"}
             width={"100%"}
             minH={"100%"}
             {...props}/>
    )
}

export function CarouselIconButton(props: IconButtonProps) {
    return (
        <IconButton
            display="none"
            fontSize="lg"
            isRound
            boxShadow="base"
            bg={useColorModeValue('white', 'gray.800')}
            _hover={{
                bg: useColorModeValue('gray.100', 'gray.700'),
            }}
            _active={{
                bg: useColorModeValue('gray.200', 'gray.600'),
            }}
            _focus={{boxShadow: 'inherit'}}
            _focusVisible={{boxShadow: 'outline'}}
            {...props}
        />
    )
}

export function useCarousel(options?: KeenSliderOptions) {
    const defaultOptions = {selector: '.chakra-carousel__slide'}
    return useKeenSlider<HTMLDivElement>({...defaultOptions, ...options})
}