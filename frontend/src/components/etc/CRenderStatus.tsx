import { handleRenderStatus } from "@/config/mapColor"

export default function CRenderStatus({ status }: { status: string }) {
    return <span className={`px-2 inline-flex text-[11px] leading-5 font-bold rounded-full uppercase ${handleRenderStatus(status)}`}>{status}</span>
}
