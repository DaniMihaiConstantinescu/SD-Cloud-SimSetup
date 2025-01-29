import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SelectSkeleton from "./skeletons/select-skeleton";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectWithLoadingProps {
    placeholder?: string;
    options?: SelectOption[];
    isLoading?: boolean;
    isDiabled?: boolean;
    onChange?: (value: string) => void;
}


export default function SelectWithLoading({
    placeholder,
    isLoading,
    isDiabled,
    options,
    onChange
}: SelectWithLoadingProps) {
    return (
        <Select disabled={isDiabled} onValueChange={onChange}>
            <SelectTrigger className="w-full bg-white text-2xl px-8 py-6 rounded-sm">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {isLoading
                        ? <SelectSkeleton />
                        : !options || options?.length === 0
                            ? <SelectLabel>No items wore found</SelectLabel>
                            : options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
