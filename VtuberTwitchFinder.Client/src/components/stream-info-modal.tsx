import {DTEmote} from "@/api/axios-client";
import {string} from "prop-types";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Grid,
    GridItem,
    IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spinner,
    Text, useDisclosure,
    VStack
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import {AddIcon} from "@chakra-ui/icons";
import EmoteAccordionItem from "@/components/emote-accordion-item";
import Link from "next/link";
import {AxiosQuery} from "@/api";
import EmoteTabs from "@/components/emote-tabs";
import EmoteAccordion from "@/components/emote-accordion";
import {useEmotesAllQuery} from "@/api/axios-client/Query";

interface Props {
    streamerInfo: StreamerInfo | undefined
}

export default function StreamInfoModal(props: Props) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const twitchQuery = AxiosQuery.Query.useEmotesQuery(Number(props.streamerInfo?.id));
    const sevenTvQuery = AxiosQuery.Query.useEmotesAllQuery(Number(props.streamerInfo?.id));
    return (
        <>
            <IconButton variant='outline' size='sm' aria-label='Open Streamer Info' onClick={onOpen}
                        icon={<AddIcon/>}/>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{props.streamerInfo?.name}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {
                            twitchQuery.isLoading || sevenTvQuery.isLoading ?
                                (<Spinner/>) :
                                (
                                    <EmoteAccordion emotes={twitchQuery.data} sevenTvEmotes={sevenTvQuery.data}/>
                                )
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Link href={"https://twitch.tv/" + props.streamerInfo?.username}
                              rel="noopener noreferrer"
                              target="_blank">
                            <Button variant='outline'>Check
                                out {props.streamerInfo?.name}!</Button>
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