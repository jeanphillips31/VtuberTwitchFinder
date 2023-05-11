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
import React from "react";
import {AddIcon} from "@chakra-ui/icons";
import EmoteAccordionItem from "@/components/emote-accordion-item";
import Link from "next/link";
import {AxiosQuery} from "@/api";
import EmoteTabs from "@/components/emote-tabs";
import EmoteAccordion from "@/components/emote-accordion";
import {DTVTuber} from "@/api/axios-client";

interface Props {
    streamerInfo: DTVTuber | undefined
}

export default function StreamInfoModal(props: Props) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const twitchEmotesQuery = AxiosQuery.TwitchQuery.useEmotesQuery(Number(props.streamerInfo?.twitchId));
    const sevenTvEmotesQuery = AxiosQuery.SevenTvQuery.useEmotesQuery(Number(props.streamerInfo?.twitchId));
    const twitchClipQuery = AxiosQuery.TwitchQuery.useClipsQuery(Number(props.streamerInfo?.twitchId));

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
                        <Tabs isFitted variant='enclosed'>
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
                                        <Text>Top 3 clips from the last 30 days:</Text>
                                        {
                                            twitchClipQuery.isLoading ?
                                                (<Spinner/>) :
                                                (
                                                    <VStack>
                                                        {twitchClipQuery.data?.map((clip) =>
                                                            <Box key={clip.id}>
                                                                <Text>
                                                                    {clip.title + " - by " + clip.creatorName}
                                                                </Text>
                                                                <Text>{clip.viewCount + " views"}</Text>
                                                                <iframe src={clip.embedUrl} height={100} width={100}
                                                                        allow={"fullscreen"}/>
                                                            </Box>
                                                        )}
                                                    </VStack>

                                                )
                                        }
                                    </Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
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