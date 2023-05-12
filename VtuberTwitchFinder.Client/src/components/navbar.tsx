import {Box, Button, Flex, Stack, useColorMode, useColorModeValue, Text, Image} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

export default function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <>
            <Box px={4} bg={useColorModeValue('gray.100', 'gray.900')}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <Box height={"80%"}>
                        <Image src={colorMode === "light" ? "/site-logo-light.png" : "/site-logo-dark.png"}
                               alt={"site logo"} height={"100%"}/>
                    </Box>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}