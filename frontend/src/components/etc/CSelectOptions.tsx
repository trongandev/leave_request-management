import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
    data: any[]
    valueKey: string
    displayKey?: string
    value?: string
    placeholder?: string
    onChangeValue?: (value: string) => void
    className?: string
    readOnly?: boolean
}

export default function CSelectOptions({ data, valueKey, displayKey, placeholder, value, onChangeValue, className, readOnly, ...props }: Props) {
    return (
        <Select value={value} onValueChange={onChangeValue} {...props} disabled={readOnly}>
            <SelectTrigger className={`w-full h-12! ${className} shadow-xs`}>
                <SelectValue placeholder={placeholder || "Choose Option"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((item) => (
                        <SelectItem key={item[valueKey]} value={item[valueKey]}>
                            {item[displayKey || valueKey]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
