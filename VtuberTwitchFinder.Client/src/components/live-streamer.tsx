import {Card, CardBody, Heading, Stack, Text} from '@chakra-ui/react'
import Image from "next/image";

export default function LiveStreamer(streamer: StreamerInfo) {
    return (
        <>
            <Card>
                <CardBody>
                    <Image src={streamer.thumbnailURL} alt={streamer.name}></Image>
                    <Stack>
                        <Heading>{streamer.name}</Heading>
                        <Text>{streamer.gameName} : {streamer.viewerCount}</Text>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}