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
import ScrollToTopButton from "@/components/scroll-to-top-button";

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
        if (status !== "loading" || inView) {
            updateFilteredVTubers();
        }
    }, [status, inView]);

    useEffect(() => {
        updateFilteredVTubers();
    }, [filters]);

    const filterCallback = useCallback((filterType: FilterOption, value: (string | number)[]) => {
        //Create a new object to trigger refresh
        let f = new FilterProperties();
        //Assign previous filters to the new object
        f.setExactMatch(filters.getExactMatch());
        f.setLanguage(filters.getLanguages());
        f.setGameName(filters.getGameNames());
        f.setValue(filterType, value)
        setFilters(f);
    }, [filters]);

    function updateFilteredVTubers() {
        let items = data?.pages.flatMap((page) => page.vTubers) ?? [];
        if (filters.getExactMatch() !== "") {
            //items = items.filter((item))
        } else {
            if (filters.getLanguages().length > 0) {
                items = items.filter((item) => filters.getLanguages().includes(item?.language as string))
            }
            if (filters.getGameNames().length > 0) {
                items = items.filter((item) => filters.getGameNames().includes(item?.currentGameName as string))
            }
        }
        if (items !== undefined) {
            console.log(items);
            setFilteredVtubers(items as DTVTuber[]);
        }
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
                {status === "loading" ? (<Spinner/>) :
                    (
                        <Box>
                            <Filters vtubers={data?.pages?.flatMap((page) => page?.vTubers) as DTVTuber[]}
                                     filtersUpdated={filterCallback}/>
                            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                {
                                    filteredVtubers.map((stream) => (
                                        <GridItem key={stream.twitchId}>
                                            <LiveStreamer
                                                streamer={stream}
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
