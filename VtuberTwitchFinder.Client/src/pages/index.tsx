import Head from 'next/head'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Grid, GridItem} from "@chakra-ui/react";
import LiveStreamer from "@/components/live-streamer";
import {AxiosQuery} from "@/api";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const query = AxiosQuery.Query.useVtubersQuery();
    return (
        <>
            <Head>
                <title>VTuber Twitch Finder</title>
                <meta name="description" content="Find your favorite Vtuber that is currently streaming!"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                {query.isLoading ? (<div>Loading!</div>) : (<Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    {
                        query.data?.map((stream) => (
                            <GridItem key={stream.twitchId}>
                                <LiveStreamer
                                    id={stream.twitchId ?? ""}
                                    name={stream.twitchName ?? ""}
                                    streamTitle={stream.streamTitle ?? ""}
                                    gameName={stream.currentGameName ?? ""}
                                    viewerCount={stream.currentViewerCount ?? 0}
                                    thumbnailURL={stream.currentThumbnailUrl ?? ""}
                                />
                            </GridItem>
                        ))
                    }
                </Grid>)}

            </main>
        </>
    )
}
