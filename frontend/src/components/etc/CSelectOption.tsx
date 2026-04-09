import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
    data: any[]
    value?: string
    placeholder?: string
    onChange?: (value: string) => any
    className?: string
    readOnly?: boolean
}

export default function CSelectOption({ data, placeholder, value, onChange, className, readOnly, ...props }: Props) {
    return (
        <Select value={value} onValueChange={onChange} {...props} disabled={readOnly}>
            <SelectTrigger className={`w-full h-12! ${className} shadow-xs`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((item) => (
                        <SelectItem key={item} value={item} className="">
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
