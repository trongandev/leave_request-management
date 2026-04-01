import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination"
import { Button } from "../ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import type { IMetaTag } from "@/types/user"
import { useTranslation } from "react-i18next"

type PaginationUIProps = {
    pagination: IMetaTag | undefined
    onPageChange: (page: number) => void
}

function getPageNumbers(current: number, total: number) {
    const pages: (number | "...")[] = []
    if (total <= 1) return [1]
    if (total <= 5) {
        for (let i = 1; i <= total; i++) pages.push(i)
    } else {
        if (current <= 3) {
            pages.push(1, 2, 3, 4, "...", total)
        } else if (current >= total - 2) {
            pages.push(1, "...", total - 3, total - 2, total - 1, total)
        } else {
            pages.push(1, "...", current - 1, current, current + 1, "...", total)
        }
    }
    return pages
}
export default function PaginationUI({ pagination, onPageChange }: PaginationUIProps) {
    const { t } = useTranslation()
    if (!pagination) {
        return null
    }
    const { page, limit, total, last_page, has_next, has_prev } = pagination
    const pages = getPageNumbers(page, last_page)

    return (
        <div className="">
            <div className="flex items-center justify-between">
                <div className="flex-1 text-sm text-neutral-500">
                    {t("etc.pagination.show")} <span className="font-medium text-neutral-900 dark:text-white">1</span> {t("etc.pagination.to")}{" "}
                    <span className="font-medium text-neutral-900 dark:text-white">{limit}</span> {t("etc.pagination.of")} <span className="font-medium text-neutral-900 dark:text-white">{total}</span>{" "}
                    {t("etc.pagination.employee")}
                </div>
                <div className="">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button variant={"outline"} disabled={!has_prev} onClick={() => onPageChange(page - 1)}>
                                    <ChevronLeftIcon />
                                </Button>
                            </PaginationItem>
                            {pages.map((pg, idx) =>
                                pg === "..." ? (
                                    <PaginationItem key={`ellipsis-${idx}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem key={`page-${page}-${idx}`}>
                                        <Button
                                            variant={pg == page ? "outline" : "ghost"}
                                            disabled={pg == page}
                                            onClick={() => {
                                                if (pg !== page) onPageChange(Number(pg))
                                            }}
                                        >
                                            {pg}
                                        </Button>
                                    </PaginationItem>
                                ),
                            )}
                            <PaginationItem>
                                <Button variant={"outline"} disabled={!has_next} onClick={() => onPageChange(page + 1)}>
                                    <ChevronRightIcon className="" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <div className="text-xs text-gray-600 text-center mt-4">
                        {t("etc.pagination.page")} {page} / {last_page}
                    </div>
                </div>
            </div>
        </div>
    )
}
