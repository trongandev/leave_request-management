import {
    BinaryIcon,
    CalendarRangeIcon,
    CaseSensitiveIcon,
    CircleChevronDownIcon,
    CircleDotIcon,
    Container,
    FileUpIcon,
    NotebookPen,
    SignatureIcon,
    SquareCheckBigIcon,
    SquareCheckIcon,
    TextInitialIcon,
} from "lucide-react"

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
        name: "SELECT OPTIONS",
        child: [
            { id: 5, name: "Dropdown Option", type: "select", icon: CircleChevronDownIcon },
            { id: 6, name: "Radio Option", type: "radio", icon: CircleDotIcon },
            { id: 7, name: "Checkbox Option", type: "checkbox", icon: SquareCheckIcon },
        ],
    },
    {
        name: "ADVANCED",
        child: [
            { id: 8, name: "File Upload", type: "file", icon: FileUpIcon },
            { id: 9, name: "Layout", type: "container", icon: Container },
            { id: 10, name: "Confirm", type: "confirm", icon: SquareCheckBigIcon },
            { id: 11, name: "Signature", type: "signature", icon: SignatureIcon },
            { id: 12, name: "Note", type: "label", icon: NotebookPen },
        ],
    },
]
