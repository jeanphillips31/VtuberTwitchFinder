import Head from 'next/head'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Box, Grid, GridItem, SimpleGrid, Skeleton, Spinner} from "@chakra-ui/react";
import LiveStreamer from "@/components/live-streamer";
import {AxiosQuery} from "@/api";
import Footer from "@/components/footer";
import {useInView} from 'react-intersection-observer'
import {useInfiniteQuery} from "@tanstack/react-query";
import {useEffect, useState, useCallback} from "react";
import Navbar from "@/components/navbar";
import FilterProperties, {FilterOption} from "@/data/filter-properties";
import CheckboxFilterPopover from "@/components/filtering/filters";
import Filters from "@/components/filtering/filters";
import {DTVTuber} from "@/api/axios-client";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const {ref, inView} = useInView()
    const [filters, setFilters] = useState<FilterProperties>(new FilterProperties());
    const [filteredVtubers, setFilteredVtubers] = useState<DTVTuber[]>([])
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
    }, [inView])

    useEffect(() => {
        updateFilteredVTubers();
    }, [filters]);

    const filterCallback = useCallback((filterType: FilterOption, value: string) => {
        setFilters(previous => {
            previous.setValue(filterType, value);
            return previous;
        });
    }, []);

    function updateFilteredVTubers() {
        let items = data?.pages?.flatMap((page) => page?.vTubers);
        console.log(items);
        if (filters.getExactMatch() !== "") {
            items = items.filter((item))
        } else {
            if (filters.getLanguages().length > 0) {
                items = items.filter((item) => filters.getLanguages().includes(item.language))
            }
        }

        setFilteredVtubers(items);
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
            <main className={`${styles.main} ${inter.className}`}>
                {status === "loading" ? (<Spinner/>) :
                    (
                        <Box>
                            <Filters vtubers={data?.pages?.flatMap((page) => page?.vTubers)}
                                     filters={filters} filtersUpdated={filterCallback}/>
                            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                {
                                    filteredVtubers.map((stream) => (
                                        <GridItem key={stream.twitchId}>
                                            <LiveStreamer
                                                id={stream.twitchId ?? ""}
                                                name={stream.twitchName ?? ""}
                                                username={stream.twitchUsername ?? ""}
                                                streamTitle={stream.streamTitle ?? ""}
                                                gameName={stream.currentGameName ?? ""}
                                                viewerCount={stream.currentViewerCount ?? 0}
                                                thumbnailURL={stream.currentThumbnailUrl ?? ""}
                                                profileURL={stream.profilePictureUrl ?? ""}
                                            />
                                        </GridItem>
                                    ))
                                }
                            </Grid>
                        </Box>
                    )
                }
                <Box ref={ref} mt={5}>
                    {hasNextPage ? (<Spinner/>) : (<div/>)}
                </Box>
            </main>
            <Footer/>
        </>
    )
}
