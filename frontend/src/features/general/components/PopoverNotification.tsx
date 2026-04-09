import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { BellIcon, BookA, XIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import etcService from "@/services/etcService"

export default function PopoverNotification() {
    const { data } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => etcService.getNotifications(),
    })

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost" size="icon" className="relative text-primary">
                    <BellIcon />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white "></span>
                    <span className="absolute animate-ping top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white "></span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:max-w-7xl rounded-xl ">
                <PopoverHeader className="flex flex-row items-center justify-between border-b pb-3">
                    <h2 className="text-lg font-bold ">Thông báo</h2>
                    <Button variant={"ghost"}>
                        <XIcon />
                    </Button>
                </PopoverHeader>
                <div className=" pointer-events-auto overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="max-h-125 overflow-y-auto scroll-smooth">
                        {data?.data.map((item) => {
                            return (
                                <div
                                    key={item._id}
                                    className={`flex items-start p-4 gap-4 border-b  hover:bg-secondary/50 cursor-pointer relative ${!item.isRead ? "border-l-4 border-l-blue-600" : ""}`}
                                >
                                    {/* Icon/Avatar Section */}
                                    {/* <div className="flex-shrink-0">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${TYPE_CONFIG[type].bg}`}>
                                                <span className={`text-xl ${TYPE_CONFIG[type].text}`}>
                                                    <CheckCircle2Icon />
                                                </span>
                                            </div>
                                        )}
                                    </div> */}

                                    {/* Content Section */}
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm  leading-snug">{item.title}</p>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase flex-shrink-0 `}>{item.type}</span>
                                        </div>
                                        <span className="text-xs text-gray-400 mt-1 block">{item.createdAt}</span>
                                    </div>
                                </div>
                            )
                        })}
                        {data?.data.length === 0 && (
                            <div className="flex flex-col items-center gap-3 py-10">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <BellIcon className="text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-500">Bạn không có thông báo nào</p>
                            </div>
                        )}
                    </div>
                    {data && data?.data?.length > 0 && (
                        <div className="px-4 py-3  grid grid-cols-2 gap-3 text-right">
                            <Button>
                                <BookA /> Đánh dấu đã đọc tất cả
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
