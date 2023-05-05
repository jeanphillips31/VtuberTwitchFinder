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
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import {AddIcon} from "@chakra-ui/icons";
import EmoteAccordionItem from "@/components/emote-accordion-item";
import Link from "next/link";
import {AxiosQuery} from "@/api";

interface Props {
    streamerInfo: StreamerInfo | undefined
}

export default function StreamInfoPopover(props: Props) {
    const query = AxiosQuery.Query.useEmotesQuery(Number(props.streamerInfo?.id));
    return (
        <>
            <Popover placement='right'>
                <PopoverTrigger>
                    <IconButton variant='outline' size='sm' aria-label='Open Streamer Info'
                                icon={<AddIcon/>}/>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow/>
                    <PopoverCloseButton/>
                    <PopoverHeader>{props.streamerInfo?.name}</PopoverHeader>
                    <PopoverBody>
                        {
                            query.isLoading ?
                                (<Spinner/>) :
                                (
                                    <Accordion allowMultiple>
                                        <EmoteAccordionItem
                                            emotes={query?.data?.followerEmotes}
                                            title="Follower Emotes"
                                        />
                                        <EmoteAccordionItem
                                            emotes={query?.data?.subscriptionEmotes?.tier1Emotes}
                                            title="Tier 1 Subscription Emotes"
                                        />
                                        <EmoteAccordionItem
                                            emotes={query?.data?.subscriptionEmotes?.tier2Emotes}
                                            title="Tier 2 Subscription Emotes"
                                        />
                                        <EmoteAccordionItem
                                            emotes={query?.data?.subscriptionEmotes?.tier3Emotes}
                                            title="Tier 3 Subscription Emotes"
                                        />
                                        <EmoteAccordionItem
                                            emotes={query?.data?.bitsEmotes}
                                            title="Bits Emotes"
                                        />
                                    </Accordion>
                                )
                        }</PopoverBody>
                    <PopoverFooter>
                        <Link href={"https://twitch.tv/" + props.streamerInfo?.username}
                              rel="noopener noreferrer"
                              target="_blank">
                            <Button variant='outline'>Check
                                out {props.streamerInfo?.name}!</Button>
                        </Link>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </>
    )
}