import '@/styles/globals.css'
import {ChakraProvider} from "@chakra-ui/react";
import type {AppProps} from 'next/app'
import {AxiosQuery} from "@/api";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

if (process.env.NEXT_PUBLIC_BASEURL)
    AxiosQuery.setBaseUrl(process.env.NEXT_PUBLIC_BASEURL);
else
    console.warn("Failed to load base url");
const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ChakraProvider>
    )
}
