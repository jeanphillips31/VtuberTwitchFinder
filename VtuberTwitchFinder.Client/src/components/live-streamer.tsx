import {
    Card,
    CardBody,
    Heading,
    VStack,
    Text,
    StackDivider,
    Box,
    Image, HStack, Flex, Skeleton
} from '@chakra-ui/react'
import {useState} from "react";
import StreamInfoModal from "@/components/stream-info-modal";
import {DTEmote, DTStreamerEmotes, DTVTuber} from "@/api/axios-client";

interface Props {
    streamer: DTVTuber
}

export default function LiveStreamer(props: Props) {
    const [hover, setHover] = useState(false);
    return (
        <>
            <Card
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <CardBody>
                    <VStack
                        spacing={3}
                        width={400}
                        alignItems={"left"}
                    >
                        <Box position="relative"
                             height={216}>
                            <Box height="100%" width="100%" borderRadius={"5px"} boxShadow={"md"} overflow={"hidden"}
                                 position={"relative"}>
                                <Image src={props.streamer.currentThumbnailUrl} alt={props.streamer.twitchName}
                                       transitionDuration={"0.2s"}
                                       _hover={{transform: "scale(105%)"}}>
                                </Image>
                                <Skeleton position={"absolute"} height="100%" width="100%"/>
                            </Box>
                            <Box position="absolute" bottom={1} right={2} bg='gray.50' rounded='sm' paddingX={1}>
                                <Text
                                    fontSize='smaller'
                                    color={"black"}>{props.streamer.currentViewerCount?.toLocaleString("en-US") + " Viewers"}</Text>
                            </Box>
                        </Box>
                        <Flex alignItems={"center"}>
                            <Image src={props.streamer.profilePictureUrl} alt={props.streamer.twitchUsername}
                                   borderRadius='full'
                                   boxSize='60px'>
                            </Image>
                            <VStack align="left" mx={3} spacing={0.5}>
                                <Heading size="lg" isTruncated={true}>{props.streamer.twitchName}</Heading>
                                <Text isTruncated={true} fontSize="sm">{props.streamer.currentGameName}</Text>
                            </VStack>
                            <Box flex={1}/>
                            <StreamInfoModal
                                streamerInfo={props.streamer}
                            />
                        </Flex>
                    </VStack>
                </CardBody>
            </Card>
        </>
    )
}