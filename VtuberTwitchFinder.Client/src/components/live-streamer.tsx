import {Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text} from '@chakra-ui/react'
import Image from "next/image";

interface StreamerInfo {
    id: number;
    name: string;
    streamTitle: string;
    gameName: string;
    viewerCount: number;
    thumbnailURL: string;
}

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