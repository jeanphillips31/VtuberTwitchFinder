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

export default function LiveStreamer(streamer: StreamerInfo) {
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
                            <Image src={streamer.thumbnailURL} alt={streamer.name} height="100%" width="100%">
                            </Image>
                            <Box position="absolute" bottom={1} right={2} bg='gray.50' rounded='sm' paddingX={1}>
                                <Text
                                    fontSize='smaller'
                                    color={"black"}>{streamer.viewerCount.toLocaleString("en-US") + " Viewers"}</Text>
                            </Box>
                        </Box>
                        <HStack spacing={5}>
                            <Image src={streamer.profileURL} alt={streamer.name} borderRadius='full'
                                   boxSize='60px'></Image>
                            <VStack align="left">
                                <Heading size="lg" isTruncated={true}>{streamer.name}</Heading>
                                <Text isTruncated={true} fontSize="sm">{streamer.gameName}</Text>
                            </VStack>
                            <StreamInfoModal
                                streamerInfo={streamer}
                            />
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>
        </>
    )
}