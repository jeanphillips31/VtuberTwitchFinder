import {SimpleGrid} from "@chakra-ui/react";
import CheckboxFilterPopover from "@/components/filtering/checkbox-filter-popover";
import {DTVTuber} from "@/api/axios-client";
import FilterProperties, {FilterOption} from "@/data/filter-properties";

type FilterCallback = (filterType: FilterOption, value: string) => void;

interface Props {
    vtubers: DTVTuber[],
    filtersUpdated: FilterCallback
}

export default function Filters(props: Props) {
    return (
        <>
            <SimpleGrid display="inline-grid" spacing="4" columns={4}>
                <CheckboxFilterPopover label={"Language"} defaultValue={[]} options={GetLanguages(props)}
                                       filterProps={props.filters} filterType={FilterOption.language}
                                       filterUpdated={props.filtersUpdated}/>
            </SimpleGrid>
        </>
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
