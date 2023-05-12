import {DTTwitchClip} from "@/api/axios-client";
import React, {useState} from "react";
import {Carousel, CarouselIconButton, CarouselSlide, useCarousel} from "@/components/carousel/carousel";
import {AspectRatio, Box, Circle, HStack, Stack, Text} from "@chakra-ui/react";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";

interface Props {
    clips: DTTwitchClip[]
}

export default function Gallery(props: Props) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [ref, slider] = useCarousel({slideChanged: (slider) => setCurrentSlide(slider.track.details.rel)})
    const hasPrevious = currentSlide !== 0
    const hasNext = currentSlide < props.clips.length - 1
    return (
        <Stack spacing="4">
            <Box position={"relative"}
                 sx={{
                     _hover: {
                         '> button': {
                             display: 'inline-flex',
                         },
                     },
                 }}>
                <Carousel ref={ref}>
                    {props.clips.map((clip, i) =>
                        <CarouselSlide key={i}>
                            <Text>
                                {clip.title + " - by " + clip.creatorName}
                            </Text>
                            <Text>{clip.viewCount + " views"}</Text>
                            <Box width={600} height={300}>
                                <iframe src={clip.embedUrl} width={600}
                                        height={300}
                                        allow={"fullscreen"}/>
                            </Box>

                        </CarouselSlide>)}
                </Carousel>
                {hasPrevious && (
                    <CarouselIconButton
                        pos="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={() => slider.current?.prev()}
                        icon={<ArrowBackIcon/>}
                        aria-label={"Previous Slide"}>

                    </CarouselIconButton>
                )}
                {hasNext && (
                    <CarouselIconButton
                        pos="absolute"
                        right="3"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={() => slider.current?.next()}
                        icon={<ArrowForwardIcon/>}
                        aria-label="Next Slide"
                    />
                )}
                <HStack position="absolute" width="full" justify="center" bottom="0" py="4">
                    {props.clips.map((_, index) => (
                        <Circle key={index} size="2" bg={currentSlide === index ? 'white' : 'whiteAlpha.400'}/>
                    ))}
                </HStack>
            </Box>
        </Stack>
    )
}