// components/form-field-custom.tsx
import { type Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface CustomFieldProps {
    control: Control<any>
    name: string
    label: string
    placeholder?: string
    type?: string
}

export const FormFieldGeneric = ({ control, name, label, placeholder, type = "text" }: CustomFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }: { field: any }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} type={type} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
)
