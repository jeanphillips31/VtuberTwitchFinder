import {Card, CardBody, Heading, Stack, Text} from '@chakra-ui/react'
import Image from "next/image";

export default function LiveStreamer(streamer: StreamerInfo) {
    return (
        <>
            <Card>
                <CardBody>
                    <Image src={streamer.thumbnailURL} alt={streamer.name} width={100} height={100}></Image>
                    <Stack>
                        <Heading>{streamer.name}</Heading>
                        <Text>{streamer.gameName} : {streamer.viewerCount}</Text>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}