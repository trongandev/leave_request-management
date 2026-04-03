import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
    data: any[]
    valueKey: string
    displayKey?: string
    descKey?: string
    value?: string
    placeholder?: string
    onChange?: (value: string) => any
    className?: string
    readOnly?: boolean
}

export default function CSelectOptionsTable({ data, valueKey, displayKey, descKey, placeholder, value, onChange, className, readOnly, ...props }: Props) {
    return (
        <Select value={value} onValueChange={onChange} {...props} disabled={readOnly}>
            <SelectTrigger className={`w-full h-12! ${className} shadow-xs`}>
                <SelectValue placeholder={placeholder || "Choose Option"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((item) => (
                        <div className={`border-b cursor-pointer transition-colors ${value === item[valueKey] ? "bg-blue-100" : "hover:bg-gray-50"} ${readOnly ? "cursor-default" : ""}`}>
                            <SelectItem key={item[valueKey]} value={item[valueKey]} className="">
                                <td className="w-32 text-sm">{item[displayKey || valueKey]}</td>
                                {descKey && <td className="w-32 text-sm text-neutral-500">{item[descKey]}</td>}
                            </SelectItem>
                        </div>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
