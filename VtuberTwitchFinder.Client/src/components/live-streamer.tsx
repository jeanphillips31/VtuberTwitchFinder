import {
    Card,
    CardBody,
    Heading,
    VStack,
    Text,
    StackDivider,
    Box,
    Image, HStack
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
                        divider={<StackDivider borderColor='gray.200'/>}
                        spacing={2}
                    >
                        <Box position="relative" width={384}
                             height={216}>
                            <Image src={props.streamer.currentThumbnailUrl} alt={props.streamer.twitchName}
                                   height="100%" width="100%">
                            </Image>
                            <Box position="absolute" bottom={1} right={2} bg='gray.50' rounded='sm' paddingX={1}>
                                <Text
                                    fontSize='smaller'
                                    color={"black"}>{props.streamer.currentViewerCount?.toLocaleString("en-US") + " Viewers"}</Text>
                            </Box>
                        </Box>
                        <HStack spacing={5}>
                            <Image src={props.streamer.profilePictureUrl} alt={props.streamer.twitchUsername}
                                   borderRadius='full'
                                   boxSize='60px'></Image>
                            <VStack align="left">
                                <Heading size="lg" isTruncated={true}>{props.streamer.twitchName}</Heading>
                                <Text isTruncated={true} fontSize="sm">{props.streamer.currentGameName}</Text>
                            </VStack>
                            <StreamInfoModal
                                streamerInfo={props.streamer}
                            />
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>
        </>
    )
}