import {useFilterState} from "@/components/filtering/use-filter-state";
import {Popover} from "@chakra-ui/react";
import {FilterPopoverButton, FilterPopoverContent} from "@/components/filtering/filter-popover";
import CheckboxFilter from "@/components/filtering/checkbox-filter";
import FilterProperties, {FilterOption} from "@/data/filter-properties";
import {useEffect, useState} from "react";

type FilterCallback = (filterType: FilterOption, value: (string | number)[]) => void;

interface Props {
    label: string;
    defaultValue: (string | number)[] | undefined;
    options: Array<{ label: string; value: string; count?: number }>;
    filterType: FilterOption,
    filterUpdated: FilterCallback,
    showSearch: boolean,
}

export default function CheckboxFilterPopover(props: Props) {
    const state = useFilterState({
        defaultValue: props.defaultValue,
        onSubmit: (data) => props.filterUpdated(props.filterType, data),
    })

    return (
        <Popover placement="bottom-start">
            <FilterPopoverButton label={props.label}/>
            <FilterPopoverContent
            >
                <CheckboxFilter
                    hideLabel
                    value={state.value}
                    onChange={(v) => {
                        state.onChange(v);
                        props.filterUpdated(props.filterType, v);
                    }}
                    options={props.options}
                    showSearch={props.showSearch}
                />
            </FilterPopoverContent>
        </Popover>
    )
}