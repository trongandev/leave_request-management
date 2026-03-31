import { BinaryIcon, CalendarRangeIcon, CaseSensitiveIcon, CircleChevronDownIcon, CircleDotIcon, Container, FileUpIcon, SquareCheckIcon, TextInitialIcon } from "lucide-react"

export const navDefault = [
    {
        name: "INPUTS",
        child: [
            { id: 1, name: "Text", type: "text", icon: CaseSensitiveIcon },
            { id: 2, name: "Number", type: "number", icon: BinaryIcon },
            { id: 3, name: "Date", type: "date", icon: CalendarRangeIcon },
            { id: 4, name: "Textarea", type: "textarea", icon: TextInitialIcon },
        ],
    },
    {
        name: "SELECT",
        child: [
            { id: 5, name: "Dropdown", type: "select", icon: CircleChevronDownIcon },
            { id: 6, name: "Radio", type: "radio", icon: CircleDotIcon },
            { id: 7, name: "Checkbox", type: "checkbox", icon: SquareCheckIcon },
        ],
    },
    {
        name: "ADVANCED",
        child: [
            { id: 8, name: "File Upload", type: "file", icon: FileUpIcon },
            { id: 9, name: "Layout", type: "container", icon: Container },
        ],
    },
]
