import {string} from "prop-types";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Grid,
    GridItem, HStack,
    IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spinner, Tab, TabList, TabPanel, TabPanels, Tabs,
    Text, useDisclosure,
    VStack,
    Image, Heading
} from "@chakra-ui/react";
import React, {useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import EmoteAccordionItem from "@/components/emote-accordion-item";
import Link from "next/link";
import {AxiosQuery} from "@/api";
import EmoteAccordion from "@/components/emote-accordion";
import {DTTwitchClip, DTVTuber} from "@/api/axios-client";
import Gallery from "@/components/carousel/gallery";

interface Props {
    streamerInfo: DTVTuber | undefined
}

export default function StreamInfoModal(props: Props) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <IconButton variant='outline' size='sm' aria-label='Open Streamer Info' onClick={onOpen}
                        icon={<AddIcon/>}/>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{props.streamerInfo?.twitchName}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <StreamInfoModalBody streamerInfo={props.streamerInfo}/>
                    </ModalBody>
                    <ModalFooter>
                        <Link href={"https://twitch.tv/" + props.streamerInfo?.twitchUsername}
                              rel="noopener noreferrer"
                              target="_blank">
                            <Button variant='outline'>Check
                                out {props.streamerInfo?.twitchName}!</Button>
                        </Link>
                        <Button colorScheme='blue' ml={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function StreamInfoModalBody(props: Props) {
    const twitchEmotesQuery = AxiosQuery.TwitchQuery.useEmotesQuery(Number(props.streamerInfo?.twitchId));
    const sevenTvEmotesQuery = AxiosQuery.SevenTvQuery.useEmotesQuery(Number(props.streamerInfo?.twitchId));
    const twitchClipQuery = AxiosQuery.TwitchQuery.useClipsQuery(Number(props.streamerInfo?.twitchId));
    //Chakra bug bypass that is adding a margin to the body
    document.body.setAttribute('style', 'margin-right: 0 !important');
    const [currentTime, setCurrentTime] = useState("");
    return (
        <Tabs isFitted variant='enclosed' onChange={((index) => setCurrentTime(new Date().toTimeString()))}>
            <TabList mb='1em'>
                <Tab>
                    Streamer Info
                </Tab>
                <Tab>
                    Emotes
                </Tab>
                <Tab>
                    Top Clips
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Box>
                        <HStack spacing={5}>
                            <Image src={props.streamerInfo?.profilePictureUrl}
                                   alt={props.streamerInfo?.twitchUsername}
                                   borderRadius='full'
                                   boxSize='100px'></Image>
                            <VStack align="left">
                                <Heading size="lg"
                                         isTruncated={true}>{props.streamerInfo?.twitchName}</Heading>
                                <Heading as={"h2"}
                                         size={"md"}>{props.streamerInfo?.streamTitle}</Heading>
                                <Text isTruncated={true}
                                      fontSize="sm">{props.streamerInfo?.currentGameName}</Text>
                                <Text>{props.streamerInfo?.language}</Text>
                            </VStack>
                        </HStack>
                    </Box>
                </TabPanel>
                <TabPanel>
                    {
                        twitchEmotesQuery.isLoading || sevenTvEmotesQuery.isLoading ?
                            (<Spinner/>) :
                            (
                                <EmoteAccordion emotes={twitchEmotesQuery.data}
                                                sevenTvEmotes={sevenTvEmotesQuery.data}/>
                            )
                    }
                </TabPanel>
                <TabPanel>
                    <Box>
                        <Heading as={"h4"} size={"md"}>Top 3 clips from the last 30 days:</Heading>
                        {
                            twitchClipQuery.isLoading ?
                                (<Spinner/>) :
                                (
                                    <Box>
                                        <Gallery clips={twitchClipQuery.data as DTTwitchClip[]} key={currentTime}/>
                                    </Box>
                                )
                        }
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>)
}