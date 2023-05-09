import {Button, HStack} from '@chakra-ui/react'

export type FilterActionButtonsProps = {
    onClickCancel?: VoidFunction
    isCancelDisabled?: boolean
    onClickApply?: VoidFunction
}

export default function FilterActionButtons(props: FilterActionButtonsProps) {
    const {onClickApply, onClickCancel, isCancelDisabled} = props
    return (
        <HStack spacing="2" justify="space-between">
            <Button size="sm" variant="ghost" onClick={onClickCancel} isDisabled={isCancelDisabled}>
                Cancel
            </Button>
            <Button size="sm" colorScheme="blue" onClick={onClickApply}>
                Save
            </Button>
        </HStack>
    )
}
