import Head from 'next/head'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {fetchStreams} from "./api/twitch-api";
import {Grid, GridItem} from "@chakra-ui/react";
import LiveStreamer from "@/components/live-streamer";

const inter = Inter({subsets: ['latin']})

type Props = {
    streams: StreamerInfo[]
}

export default function Home(props: Props) {
    return (
        <>
            <Head>
                <title>VTuber Twitch Finder</title>
                <meta name="description" content="Find your favorite Vtuber that is currently streaming!"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    {
                        props.streams.map((stream) => (
                            <GridItem key={stream.id}>
                                <LiveStreamer
                                    id={stream.id}
                                    name={stream.name}
                                    streamTitle={stream.streamTitle}
                                    gameName={stream.gameName}
                                    viewerCount={stream.viewerCount}
                                    thumbnailURL={stream.thumbnailURL}
                                />
                            </GridItem>
                        ))
                    }
                </Grid>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const response = await fetchStreams();
    const props: Props = {
        streams: response
    };
    return {
        props: props
    }
}
