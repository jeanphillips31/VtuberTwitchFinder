import {
    Box,
    Card,
    CardBody, Grid, GridItem,
    Heading,
    HStack,
    StackDivider,
    Tab,
    TabList, TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from "@chakra-ui/react";
import {DTStreamerEmotes} from "@/api/axios-client";
import Image from "next/image";
import React from "react";
import EmoteTabpanel from "@/components/emote-tabpanel";

interface Props {
    emotes: DTStreamerEmotes | undefined
}

export default function EmoteTabs(props: Props) {
    return (
        <>
            <Tabs isFitted variant='enclosed' defaultIndex={1}>
                <TabList mb='1em'>
                    <Tab isDisabled={props.emotes?.followerEmotes?.length == 0}>
                        Follower Emotes
                    </Tab>
                    <Tab isDisabled={props.emotes?.subscriptionEmotes?.tier1Emotes?.length == 0}>
                        Tier 1 Subscription Emotes
                    </Tab>
                    <Tab isDisabled={props.emotes?.subscriptionEmotes?.tier2Emotes?.length == 0}>
                        Tier 2 Subscription Emotes
                    </Tab>
                    <Tab isDisabled={props.emotes?.subscriptionEmotes?.tier3Emotes?.length == 0}>
                        Tier 3 Subscription Emotes
                    </Tab>
                    <Tab isDisabled={props.emotes?.bitsEmotes?.length == 0}>
                        Bits Emotes
                    </Tab>
                </TabList>
                <TabPanels>
                    <EmoteTabpanel
                        emotes={props.emotes?.followerEmotes}
                    />
                    <EmoteTabpanel
                        emotes={props.emotes?.subscriptionEmotes?.tier1Emotes}
                    />
                    <EmoteTabpanel
                        emotes={props.emotes?.subscriptionEmotes?.tier2Emotes}
                    />
                    <EmoteTabpanel
                        emotes={props.emotes?.subscriptionEmotes?.tier3Emotes}
                    />
                    <EmoteTabpanel
                        emotes={props.emotes?.bitsEmotes}
                    />
                </TabPanels>
            </Tabs>
        </>
    )
}