import type { Field } from "@/types/form-template"
import { useState, useCallback } from "react"

// export interface FormField {
//     id: string
//     type: "text" | "number" | "date" | "textarea" | "select" | "radio" | "checkbox" | "file" | "container"
//     label: string
//     placeholder?: string
//     required?: boolean
//     readOnly?: boolean
//     defaultValue?: any
//     options?: Array<{ label: string; value: string }>
//     validation?: any
//     ui?: any
//     order?: number
//     parentId?: string | null
//     layout?: {
//         direction: "row" | "col"
//     }
// }

export const useFormBuilder = () => {
    const [fields, setFields] = useState<Field[]>([])
    const [activeFieldId, setActiveFieldId] = useState<string | null>(null)

    const addField = useCallback(
        (type: Field["type"], options?: { index?: number; parentId?: string | null }) => {
            const newField: Field = {
                id: `${type}_${Math.random().toString(36).substr(2, 8)}`,
                type,
                label: `New ${type}`,
                placeholder: "",
                required: false,
                readOnly: false,
                options: type === "select" || type === "radio" ? [{ label: "Option 1", value: "opt_1" }] : undefined,
                order: fields.length,
                parentId: options?.parentId || null,
                layout: type === "container" ? { direction: "row" } : undefined,
            }
            setFields((prev) => {
                const newFields = [...prev]
                if (typeof options?.index === "number") {
                    newFields.splice(options.index, 0, newField)
                } else {
                    newFields.push(newField)
                }
                return newFields.map((f, i) => ({ ...f, order: i }))
            })
            setActiveFieldId(newField.id)
            return newField
        },
        [fields.length],
    )

    const updateField = useCallback((fieldId: string, updates: Partial<Field>) => {
        setFields((prev) => prev.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)))
    }, [])

    const removeField = useCallback((fieldId: string) => {
        setFields((prev) => {
            // Remove the field and also any children if it's a container
            const newFields = prev.filter((f) => f.id !== fieldId && f.parentId !== fieldId)
            return newFields.map((f, i) => ({ ...f, order: i }))
        })
        setActiveFieldId((prev) => (prev === fieldId ? null : prev))
    }, [])

    const moveField = useCallback((activeId: string, overId: string, parentId: string | null = null, newIndex?: number) => {
        setFields((prev) => {
            const oldIndex = prev.findIndex((f) => f.id === activeId)
            if (oldIndex === -1) return prev

            const newFields = [...prev]
            const [movedField] = newFields.splice(oldIndex, 1)
            movedField.parentId = parentId

            if (typeof newIndex === "number" && newIndex >= 0) {
                newFields.splice(newIndex, 0, movedField)
            } else {
                const dropIndex = newFields.findIndex((f) => f.id === overId)
                if (dropIndex !== -1) {
                    newFields.splice(dropIndex, 0, movedField)
                } else {
                    newFields.push(movedField)
                }
            }

            return newFields.map((f, i) => ({ ...f, order: i }))
        })
    }, [])

    return {
        fields,
        setFields,
        activeFieldId,
        setActiveFieldId,
        addField,
        updateField,
        removeField,
        moveField,
    }
}
