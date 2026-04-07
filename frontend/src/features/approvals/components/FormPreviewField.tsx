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
export default function FormPreviewField({ child, field }: { child: any; field?: any }) {
    const sigCanvas = useRef<any>(null)

    function clear() {
        sigCanvas.current.clear()
    }

    return (
        <div key={child.id} className={field?.layout?.direction === "row" ? "flex-1" : ""}>
            <div className="space-y-1 mb-4">
                {child.type !== "label" && child.type !== "confirm" && (
                    <Label>
                        {child.label} {child.required && <span className="text-red-500">*</span>}
                    </Label>
                )}

                {child.type === "text" && <Input placeholder={child.placeholder} readOnly={child.readOnly} />}
                {child.type === "number" && <Input type="number" placeholder={child.placeholder} readOnly={child.readOnly} />}
                {child.type === "textarea" && <Textarea placeholder={child.placeholder} readOnly={child.readOnly} />}
                {child.type === "select" && <CSelectOptions data={child.options || []} placeholder={child.placeholder} valueKey="value" readOnly={child.readOnly} />}
                {child.type === "date" && <DatePicker className="" />}
                {child.type === "file" && (
                    <div className="border-2 border-dashed hover:text-primary text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-24 text-center text-sm rounded-md bg-card flex items-center justify-center gap-2">
                        <FileUpIcon />
                        <p className="text-sm font-medium">File upload area</p>
                    </div>
                )}
                {child.type === "checkbox" && (
                    <div className="space-y-2">
                        {(child.options || []).map((opt: any, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <input type="checkbox" id={`${child.id}_opt_${i}`} name={child.id} value={opt.value} disabled={child.readOnly} />
                                <label htmlFor={`${child.id}_opt_${i}`} className="text-sm text-neutral-500">
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
                                <input type="radio" id={`${child.id}_opt_${i}`} name={child.id} value={opt.value} disabled={child.readOnly} />
                                <label htmlFor={`${child.id}_opt_${i}`} className="text-sm text-neutral-500">
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
