import Head from 'next/head'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Box, Container, Grid, GridItem, SimpleGrid, Spinner, Wrap, WrapItem} from "@chakra-ui/react";
import LiveStreamer from "@/components/live-streamer";
import {AxiosQuery} from "@/api";
import Footer from "@/components/footer";
import {useInView} from 'react-intersection-observer'
import {useInfiniteQuery} from "@tanstack/react-query";
import {useCallback, useEffect, useState} from "react";
import Navbar from "@/components/navbar";
import FilterProperties, {FilterOption} from "@/data/filter-properties";
import Filters from "@/components/filtering/filters";
import {DTVTuber} from "@/api/axios-client";
import ScrollToTopButton from "@/components/scroll-to-top-button";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const {ref, inView} = useInView()
    const [filters, setFilters] = useState<FilterProperties>(new FilterProperties());
    const {
        status,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['streams'],
        async ({pageParam = undefined}) => {
            return await AxiosQuery.TwitchQuery.Client().vtubers(pageParam)
        },
        {
            getNextPageParam: (page) => page?.cursor,
        },
    )

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage])


    const filterCallback = useCallback((filterType: FilterOption, value: (string | number)[]) => {
        //Create a new object to trigger refresh
        let f = new FilterProperties();
        if (filterType !== FilterOption.reset) {
            //Assign previous filters to the new object
            f.setLanguage(filters.getLanguages());
            f.setGameName(filters.getGameNames());
            f.setValue(filterType, value)
        }
        setFilters(f);
    }, [filters]);

    function canShowVTuber(vtuber: DTVTuber): boolean {
        if (filters.getLanguages().length > 0 && !filters.getLanguages().includes(vtuber.language as string)) {
            return false;
        }
        if (filters.getGameNames().length > 0 && !filters.getGameNames().includes(vtuber.currentGameName as string)) {
            return false
        }
        return true;
    }

    return (
        <>
            <Head>
                <title>VTuber Twitch Finder</title>
                <meta name="description" content="Find your favorite Vtuber that is currently streaming!"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <ScrollToTopButton/>
            <main className={`${styles.main} ${inter.className}`}>
                {status === "loading" ? (<Spinner mt={10}/>) :
                    (
                        <Box>
                            <Filters vtubers={data?.pages?.flatMap((page) => page?.vTubers) as DTVTuber[]}
                                     filtersUpdated={filterCallback}
                                     filteredVtubers={data?.pages.flatMap((page) => page.vTubers).filter((stream) => canShowVTuber(stream as DTVTuber)) as DTVTuber[]}/>
                            <Container maxW={"1500"}>
                                <Wrap justify={"center"}>
                                    {
                                        data?.pages.flatMap((page) => page.vTubers).map((stream) => (
                                            canShowVTuber(stream as DTVTuber) &&
                                            (
                                                <WrapItem key={stream?.twitchId}>
                                                    <LiveStreamer
                                                        streamer={stream as DTVTuber}
                                                    />
                                                </WrapItem>
                                            )
                                        ))
                                    }
                                </Wrap>
                            </Container>
                        </Box>
                    )
                }
                <Box ref={ref}>
                    {hasNextPage ? (
                        <Box mt={5}><Spinner/></Box>) : (<div/>)}
                </Box>
            </main>
            <Footer/>
        </>
    )
}
