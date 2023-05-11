import {useEffect, useState} from "react";
import {ArrowUpIcon} from "@chakra-ui/icons";
import {Box, Button} from "@chakra-ui/react";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next

function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({top: 0, behavior: "smooth"})
}

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 800) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        })
    });

    return (
        <>
            {showButton ? (<Button
                position={"fixed"}
                bottom={0}
                right={0}
                m={10}
                zIndex={20}
                onClick={scrollToTop}>
                <ArrowUpIcon/>
            </Button>) : (<div/>)}
        </>
    )
}