import CSelectOptions from "@/components/etc/CSelectOptions"
import SignatureCanvas from "@/components/etc/SignatureCanvas"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import DatePicker from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Eraser, FileUpIcon } from "lucide-react"
import { useRef } from "react"
export default function FormPreviewFieldWithValue({
    child,
    field,
    stateValueData,
    handleChangeValue,
}: {
    child: any
    field?: any
    stateValueData: any
    handleChangeValue?: (name: string, value: any) => void
}) {
    const sigCanvas = useRef<any>(null)

    const clear = () => {
        sigCanvas.current?.clearSignature()
    }

    return (
        <div key={child.name} className={field?.layout?.direction === "row" ? "flex-1" : ""}>
            <div className="space-y-1 mb-4">
                {child.type !== "label" && child.type !== "confirm" && (
                    <Label>
                        {child.label} {child.required && <span className="text-red-500">*</span>}
                    </Label>
                )}

                {child.type === "text" && (
                    <Input
                        placeholder={child.placeholder}
                        readOnly={child.readOnly}
                        value={stateValueData[child.name]}
                        onChange={(e) => handleChangeValue && handleChangeValue(child.name, e.target.value)}
                    />
                )}
                {child.type === "number" && (
                    <Input
                        type="number"
                        placeholder={child.placeholder}
                        readOnly={child.readOnly}
                        value={stateValueData[child.name]}
                        onChange={(e) => handleChangeValue && handleChangeValue(child.name, e.target.value)}
                    />
                )}
                {child.type === "textarea" && (
                    <Textarea
                        placeholder={child.placeholder}
                        readOnly={child.readOnly}
                        value={stateValueData[child.name]}
                        onChange={(e) => handleChangeValue && handleChangeValue(child.name, e.target.value)}
                        className={`${field?.type === "container" ? "h-12" : "h-28"}`}
                    />
                )}
                {child.type === "select" && (
                    <CSelectOptions
                        data={child.options || []}
                        placeholder={child.placeholder}
                        valueKey="value"
                        readOnly={child.readOnly}
                        value={stateValueData[child.name]}
                        onChange={(value) => handleChangeValue && handleChangeValue(child.name, value)}
                    />
                )}
                {child.type === "date" && <DatePicker className="" onChangeValue={(value) => handleChangeValue && handleChangeValue(child.name, value?.toISOString())} />}
                {child.type === "file" && (
                    <div className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2">
                        <input type="file" onChange={(e) => handleChangeValue && handleChangeValue(child.name, e.target.files?.[0])} hidden />
                        <FileUpIcon />
                        <p className="text-sm font-medium">File upload area</p>
                    </div>
                )}
                {child.type === "checkbox" && (
                    <div className="space-y-2">
                        {(child.options || []).map((opt: any, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`${child.name}_opt_${i}`}
                                    name={child.name}
                                    value={opt.value}
                                    disabled={child.readOnly}
                                    checked={stateValueData[child.name]?.includes(opt.value)}
                                    onChange={(e) => {
                                        const values = stateValueData[child.name] || []
                                        if (e.target.checked) {
                                            handleChangeValue?.(child.name, [...values, opt.value])
                                        } else {
                                            handleChangeValue?.(
                                                child.name,
                                                values.filter((v: any) => v !== opt.value),
                                            )
                                        }
                                    }}
                                />
                                <label htmlFor={`${child.name}_opt_${i}`} className="text-sm text-neutral-500">
                                    {opt.label}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                {child.type === "radio" && (
                    <div className="space-y-2">
                        {(child.options || []).map((opt: any, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id={`${child.name}_opt_${i}`}
                                    name={child.name}
                                    value={opt.value}
                                    disabled={child.readOnly}
                                    checked={stateValueData[child.name] === opt.value}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleChangeValue?.(child.name, opt.value)
                                        }
                                    }}
                                />
                                <label htmlFor={`${child.name}_opt_${i}`} className="text-sm text-neutral-500">
                                    {opt.label}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                {child.type === "confirm" && (
                    <div className="text-sm text-neutral-500 flex gap-2 items-center">
                        <Checkbox id={`confirm-${child.id}`} /> <label htmlFor={`confirm-${child.id}`}>{child.label || "Tôi đã đọc và đồng ý với các điều khoản"}</label>
                    </div>
                )}
                {child.type === "label" && <div className="text-sm text-neutral-500">{child.label || "Nhập ghi chú ở đây"}</div>}
                {child.type === "signature" && (
                    <div className="flex">
                        <SignatureCanvas ref={sigCanvas} className="text-sm text-neutral-500  h-64 flex items-center justify-center border-2 border-dashed rounded-xl flex-1" />
                        <div className="ml-4">
                            <Button variant="destructive" size="sm" onClick={clear}>
                                <Eraser />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
