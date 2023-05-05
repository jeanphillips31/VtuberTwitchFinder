import {
    Box,
    Card,
    CardBody, Grid, GridItem,
    Heading,
    HStack, SimpleGrid,
    StackDivider,
    Tab,
    TabList, TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from "@chakra-ui/react";
import {DTEmote, DTStreamerEmotes} from "@/api/axios-client";
import Image from "next/image";
import React from "react";

interface Props {
    emotes: DTEmote[] | undefined
}

export default function EmoteTabpanel(props: Props) {
    return (
        <>
            <TabPanel>
                <SimpleGrid columns={3}>
                    {props.emotes?.map((emote) => (
                        <GridItem key={emote.id}>
                            <VStack>
                                <Image src={emote.url ?? ""}
                                       alt={emote.name ?? ""}
                                       width={50}
                                       height={50}>
                                </Image>
                                <Text>{emote.name}</Text>
                            </VStack>
                        </GridItem>
                    ))}
                </SimpleGrid>
            </TabPanel>
        </>
    )
}