import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { type LucideIcon } from "lucide-react"

interface Props {
    iconLeft: LucideIcon
    iconRight?: LucideIcon
    formik: any
    name: string
    label: string
    type?: string
    placeholder: string
}

export default function InputField({ iconLeft: IconLeft, iconRight: IconRight, name, formik, label = "Input field", type = "text", placeholder = "" }: Props) {
    return (
        <div className="space-y-2">
            <Label className="" htmlFor={name}>
                {label}
            </Label>
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IconLeft className="text-gray-400" />
                </div>
                <Input className="block w-full h-12 pl-11 pr-3" id={name} name={name} placeholder={placeholder} type={type} value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {IconRight && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        <IconRight className="text-gray-400" />
                    </div>
                )}
            </div>
            {formik.touched[name] && formik.errors[name] ? <p className="text-sm text-red-500">{formik.errors[name]}</p> : null}
        </div>
    )
}
