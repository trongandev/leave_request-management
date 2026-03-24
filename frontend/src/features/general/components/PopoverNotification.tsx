import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BellIcon, BookA, CheckCircle2Icon, EyeIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { notifyData, TYPE_CONFIG } from "./templateDataNotify"

export default function PopoverNotification() {
    const filterData = ["Tất cả", "Cảnh báo", "Hệ thống", "Yêu cầu", "Gắn thẻ", "Tài liệu"]
    const [selectedFilter, setSelectedFilter] = useState("Tất cả")
    const [filter, setFilter] = useState(notifyData)
    const handleFilter = (selectedFilter: string) => {
        setSelectedFilter(selectedFilter)
        setFilter(notifyData.filter((item) => item.label.toLowerCase() === selectedFilter.toLowerCase() || selectedFilter === "Tất cả"))
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost" size="icon" className="relative text-primary">
                    <BellIcon />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white "></span>
                    <span className="absolute animate-ping top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white "></span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:max-w-3xl rounded-xl p-0 ">
                <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-outline-variant">
                    <h2 className="text-lg font-bold ">Thông báo</h2>
                    <Button variant={"ghost"}>
                        <XIcon />
                    </Button>
                </div>
                <div className=" pointer-events-auto overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-6 py-3 border-b flex gap-2 overflow-x-auto no-scrollbar bg-surface-container-lowest">
                        {filterData.map((item) => (
                            <Button key={item} variant={selectedFilter === item ? "default" : "ghost"} className="rounded-full" onClick={() => handleFilter(item)}>
                                {item}
                            </Button>
                        ))}
                    </div>

                    <div className="max-h-[716px] overflow-y-auto scroll-smooth">
                        {filter.map((item) => {
                            const type = item.type as keyof typeof TYPE_CONFIG

                            return (
                                <div
                                    key={item.id}
                                    className={`flex items-start p-4 gap-4 border-b  hover:bg-secondary/50 cursor-pointer relative ${!item.isRead ? "border-l-4 border-l-blue-600" : ""}`}
                                >
                                    {/* Icon/Avatar Section */}
                                    <div className="flex-shrink-0">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${TYPE_CONFIG[type].bg}`}>
                                                {/* Bạn có thể dùng Lucide-react hoặc FontAwesome icon ở đây */}
                                                <span className={`text-xl ${TYPE_CONFIG[type].text}`}>
                                                    <CheckCircle2Icon />
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm  leading-snug" dangerouslySetInnerHTML={{ __html: item.content }} />
                                            <span
                                                className={`text-[10px] font-bold px-2 py-1 rounded uppercase flex-shrink-0 ${TYPE_CONFIG[type].labelBg} ${item.type !== "REQUEST" ? TYPE_CONFIG[type].text : ""}`}
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400 mt-1 block">{item.time}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="px-4 py-3 bg-surface-container-lowest grid grid-cols-2 gap-3">
                        <Button variant={"outline"}>
                            <EyeIcon />
                            Xem tất cả thông báo
                        </Button>
                        <Button>
                            <BookA /> Đánh dấu đã đọc tất cả
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
