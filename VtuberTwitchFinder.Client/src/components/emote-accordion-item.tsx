import {
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    Grid,
    GridItem, SimpleGrid,
    Text,
    VStack
} from "@chakra-ui/react";
import Image from "next/image";
import {DTEmote, IDTEmote} from "@/api/axios-client";
import {string} from "prop-types";
import React from "react";

interface Props {
    emotes: DTEmote[] | undefined,
    title: string
}

export default function EmoteAccordionItem(props: Props) {
    return (
        <>
            <AccordionItem isDisabled={props.emotes == null || props.emotes?.length == 0}>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            {props.title}
                        </Box>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
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
                </AccordionPanel>
            </AccordionItem>
        </>
    )
}