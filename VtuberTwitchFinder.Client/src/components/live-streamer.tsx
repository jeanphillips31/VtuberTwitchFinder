import {
    Card,
    CardBody,
    Heading,
    HStack,
    VStack,
    Text,
    IconButton,
    StackDivider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Box,
    PopoverFooter,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Spinner,
    Grid,
    GridItem,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";
import {AxiosQuery} from "@/api";
import EmoteAccordionItem from "@/components/emote-accordion-item";
import {DTEmote} from "@/api/axios-client";
import StreamInfoPopover from "@/components/stream-info-popover";
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
                        spacing={4}
                    >
                        <Image src={streamer.thumbnailURL} alt={streamer.name} width={256} height={144}></Image>
                        <Box display='flex' alignItems='center'><Heading>{streamer.name}</Heading></Box>
                        <HStack>
                            <Text>{streamer.gameName} : {streamer.viewerCount}</Text>
                            <Text>{streamer.id}</Text>
                            {hover ?
                                (
                                    <StreamInfoModal
                                        streamerInfo={streamer}
                                    />
                                ) : (<div></div>)}
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>
        </>
    )
}