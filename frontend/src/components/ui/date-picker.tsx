import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
export default function DatePicker({ onChangeValue, placeholder, className }: { onChangeValue?: (date: Date | undefined) => void; placeholder?: string; className?: string }) {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" id="date-picker-simple" className={`w-full h-12 justify-start font-normal ${className}`}>
                    {date ? format(date, "PPP") : <span>{placeholder || "Pick a date"}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                        setDate(newDate)
                        onChangeValue?.(newDate)
                    }}
                    defaultMonth={date}
                />
            </PopoverContent>
        </Popover>
    )
}
