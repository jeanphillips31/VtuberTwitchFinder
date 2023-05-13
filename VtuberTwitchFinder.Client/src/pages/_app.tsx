import '@/styles/globals.css'
import {ChakraProvider} from "@chakra-ui/react";
import type {AppProps} from 'next/app'
import {AxiosQuery} from "@/api";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    if (process.env.NEXT_PUBLIC_BASEURL)
        AxiosQuery.setBaseUrl(process.env.NEXT_PUBLIC_BASEURL);
    else
        AxiosQuery.setBaseUrl("https://api.vtubers.app");
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ChakraProvider>
    )
}
