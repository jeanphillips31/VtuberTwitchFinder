import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    Grid,
    GridItem,
    Text,
    VStack
} from "@chakra-ui/react";
import Image from "next/image";
import {DTEmote, DTStreamerEmotes, IDTEmote} from "@/api/axios-client";
import {string} from "prop-types";
import React from "react";
import EmoteAccordionItem from "@/components/emote-accordion-item";

interface Props {
    emotes: DTStreamerEmotes | undefined,
    sevenTvEmotes: DTEmote[] | undefined
}

export default function EmoteAccordion(props: Props) {
    return (
        <>
            <Accordion allowMultiple>
                <EmoteAccordionItem
                    emotes={props.emotes?.followerEmotes}
                    title="Follower Emotes"
                />
                <EmoteAccordionItem
                    emotes={props.emotes?.subscriptionEmotes?.tier1Emotes}
                    title="Tier 1 Subscription Emotes"
                />
                <EmoteAccordionItem
                    emotes={props.emotes?.subscriptionEmotes?.tier2Emotes}
                    title="Tier 2 Subscription Emotes"
                />
                <EmoteAccordionItem
                    emotes={props.emotes?.subscriptionEmotes?.tier3Emotes}
                    title="Tier 3 Subscription Emotes"
                />
                <EmoteAccordionItem
                    emotes={props.emotes?.bitsEmotes}
                    title="Bits Emotes"
                />
                <EmoteAccordionItem
                    emotes={props.sevenTvEmotes}
                    title="7TV Emotes"
                />
            </Accordion>
        </>
    )
}