import {Box, Button, SimpleGrid, Text} from "@chakra-ui/react";
import CheckboxFilterPopover from "@/components/filtering/checkbox-filter-popover";
import {DTVTuber} from "@/api/axios-client";
import FilterProperties, {FilterOption} from "@/data/filter-properties";
import {useState} from "react";

type FilterCallback = (filterType: FilterOption, value: (string | number)[]) => void;

interface Props {
    vtubers: DTVTuber[],
    filtersUpdated: FilterCallback
}

export default function Filters(props: Props) {
    const [reset, setReset] = useState();
    return (
        <Box mb={5} mt={-10}>
            <SimpleGrid display="inline-grid" spacing="4" columns={5}>
                <Text textAlign={"center"} justifyContent={"center"}>Filter By: </Text>
                <CheckboxFilterPopover label={"Language"} defaultValue={[]} options={GetLanguages(props)}
                                       filterType={FilterOption.language}
                                       filterUpdated={props.filtersUpdated}
                                       showSearch={false} key={"lang"} reset={reset}/>
                <CheckboxFilterPopover label={"Game"} defaultValue={[]} options={GetGames(props)}
                                       filterType={FilterOption.gameName}
                                       filterUpdated={props.filtersUpdated}
                                       showSearch={true} key={"game"} reset={reset}/>
                <Button onClick={() => {
                    setReset(true);
                }}>Reset</Button>
            </SimpleGrid>
        </Box>
    )
}

function GetLanguages(props: Props): Array<{ label: string; value: string; count?: number }> {
    let languages: Array<{ label: string; value: string, count: number }> = [];
    for (let val of props.vtubers) {
        //Check to see if languages array already has this value. If it does then update the Count, otherwise add it
        if (languages.some((x) => x.value === val.language)) {
            let indexToUpdate = languages.findIndex((item) => item.value === val.language);
            languages[indexToUpdate].count += 1;
        } else {
            languages.push({label: val.language ?? "", value: val.language ?? "", count: 1})
        }

    }
    return languages;
}

function GetGames(props: Props): Array<{ label: string; value: string; count?: number }> {
    let games: Array<{ label: string; value: string, count: number }> = [];
    for (let val of props.vtubers) {
        //Check to see if games array already has this value. If it does then update the Count, otherwise add it
        if (games.some((x) => x.value === val.currentGameName)) {
            let indexToUpdate = games.findIndex((item) => item.value === val.currentGameName);
            games[indexToUpdate].count += 1;
        } else {
            games.push({label: val.currentGameName ?? "", value: val.currentGameName ?? "", count: 1})
        }

    }
    return games;
}
