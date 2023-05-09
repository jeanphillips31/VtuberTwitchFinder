import {ButtonGroup, Container, IconButton, Stack, Text} from '@chakra-ui/react'

export default function Footer() {
    return (
        <>
            <Container as="footer" role="contentinfo" py={{base: '12', md: '16'}}>
                <Stack spacing={{base: '4', md: '5'}}>
                    <Stack justify="space-between" direction="row" align="center">
                    </Stack>
                    <Text fontSize="sm" color="subtle">
                        &copy; {new Date().getFullYear()} Whatever, Inc. All rights reserved.
                    </Text>
                </Stack>
            </Container>
        </>
    )
}