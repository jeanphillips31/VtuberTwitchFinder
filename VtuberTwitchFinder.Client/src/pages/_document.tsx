import {Head, Html, Main, NextScript} from 'next/document';
import {ColorModeScript} from "@chakra-ui/react";
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script
                    strategy="defer"
                    data-domain="vtubers.app"
                    src="https://plausible.plexus.gg/js/script.js"
                />
            </Head>
            <body>
            <ColorModeScript initialColorMode={"dark"}/>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}