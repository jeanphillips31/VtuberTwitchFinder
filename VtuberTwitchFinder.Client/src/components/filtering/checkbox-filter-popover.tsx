import {useFilterState} from "@/components/filtering/use-filter-state";
import {Popover} from "@chakra-ui/react";
import {FilterPopoverButton, FilterPopoverContent} from "@/components/filtering/filter-popover";
import CheckboxFilter from "@/components/filtering/checkbox-filter";
import FilterProperties, {FilterOption} from "@/data/filter-properties";

interface Props {
    label: string;
    defaultValue: (string | number)[] | undefined;
    options: Array<{ label: string; value: string; count?: number }>;
    filterProps: FilterProperties;
    filterType: FilterOption
}

let properties: Props;

export default function CheckboxFilterPopover(props: Props) {
    properties = props;
    const state = useFilterState({
        defaultValue: props.defaultValue,
        onSubmit: updateFilters,
    })

    return (
        <Popover placement="bottom-start">
            <FilterPopoverButton label={props.label}/>
            <FilterPopoverContent
                isCancelDisabled={!state.canCancel}
                onClickApply={state.onSubmit}
                onClickCancel={state.onReset}
            >
                <CheckboxFilter
                    hideLabel
                    value={state.value}
                    onChange={(v) => {
                        state.onChange(v);

                    }}
                    options={props.options}
                />
            </FilterPopoverContent>
        </Popover>
    )
}

function updateFilters(state: any) {
    properties.filterProps.setValue(properties.filterType, state)
}