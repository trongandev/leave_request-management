import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CircleCheck, ClipboardClock, ContactRound, Download, Edit, Eye, Search, Thermometer, Umbrella, Venus } from "lucide-react"

export default function MyRequestHistoryListPage() {
    const dataDashboard = [
        { label: "Pending", value: 3, icon: <ClipboardClock />, bgColor: "bg-yellow-50 text-yellow-600" },
        { label: "Approved (YTD)", value: 12, icon: <CircleCheck />, bgColor: "bg-green-50 text-green-600" },
        { label: "Leave Balance", value: 14, icon: <Calendar />, bgColor: "bg-blue-50 text-blue-600" },
    ]
    const dataHeader = ["Request ID", "Group Type", "Type", "Submitted", "Dates", "Duration", "Status", "Action"]
    const data = [
        {
            id: "#REQ-2023-045",
            type: "Annual Leave",
            groupType: "Time Management",
            submitted: "Oct 24, 2023",
            dates: "Nov 12 - Nov 15",
            duration: "3 days",
            status: "Pending",
        },
        {
            id: "#REQ-2023-046",
            type: "Sick Leave",
            groupType: "Time Management",
            submitted: "Oct 25, 2023",
            dates: "Nov 16 - Nov 18",
            duration: "2 days",
            status: "Approved",
        },
        {
            id: "#REQ-2023-047",
            type: "Maternity Leave",
            groupType: "Time Management",
            submitted: "Oct 26, 2023",
            dates: "Nov 19 - Dec 19",
            duration: "30 days",
            status: "Pending",
        },
        {
            id: "#REQ-2023-048",
            type: "Paternity Leave",
            groupType: "Time Management",
            submitted: "Oct 27, 2023",
            dates: "Nov 20 - Nov 24",
            duration: "5 days",
            status: "Approved",
        },
        {
            id: "#REQ-2023-049",
            type: "Unpaid Leave",
            groupType: "Time Management",
            submitted: "Oct 28, 2023",
            dates: "Nov 25 - Nov 30",
            duration: "6 days",
            status: "Rejected",
        },
        {
            id: "#REQ-2023-050",
            type: "Bereavement Leave",
            groupType: "Time Management",
            submitted: "Oct 29, 2023",
            dates: "Nov 1 - Nov 3",
            duration: "3 days",
            status: "Approved",
        },
        {
            id: "#REQ-2023-051",
            type: "Overtime Request",
            groupType: "Time Management",
            submitted: "Oct 30, 2023",
            dates: "Nov 4 - Nov 6",
            duration: "8 hours",
            status: "Pending",
        },
        {
            id: "#REQ-2023-052",
            type: "Business Trip",
            groupType: "Business Travel",
            submitted: "Oct 31, 2023",
            dates: "Nov 7 - Nov 10",
            duration: "4 days",
            status: "Approved",
        },
        {
            id: "#REQ-2023-053",
            type: "Vehicle Request",
            groupType: "Business Travel",
            submitted: "Nov 1, 2023",
            dates: "Nov 8",
            duration: "1 day",
            status: "Pending",
        },
        {
            id: "#REQ-2023-054",
            type: "Advance Payment",
            groupType: "Finance & Payment",
            submitted: "Nov 2, 2023",
            dates: "Nov 9",
            duration: "N/A",
            status: "Approved",
        },
        {
            id: "#REQ-2023-055",
            type: "Expense Reimbursement",
            groupType: "Finance & Payment",
            submitted: "Nov 3, 2023",
            dates: "Nov 10",
            duration: "N/A",
            status: "Pending",
        },
        {
            id: "#REQ-2023-056",
            type: "Equipment Purchase",
            groupType: "Finance & Payment",
            submitted: "Nov 4, 2023",
            dates: "Nov 11",
            duration: "N/A",
            status: "Approved",
        },
        {
            id: "#REQ-2023-057",
            type: "Resignation",
            groupType: "HR & Internal",
            submitted: "Nov 5, 2023",
            dates: "Dec 5",
            duration: "30 days notice",
            status: "Pending",
        },
        {
            id: "#REQ-2023-058",
            type: "Recruitment Request",
            groupType: "HR & Internal",
            submitted: "Nov 6, 2023",
            dates: "Nov 12",
            duration: "N/A",
            status: "Approved",
        },
    ]

    const handleRenderType = (type: string) => {
        switch (type) {
            case "Annual Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        <Umbrella size={16} />
                    </div>
                )
            case "Sick Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mr-2">
                        <Thermometer size={16} />
                    </div>
                )
            case "Maternity Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center mr-2">
                        <Venus size={16} />
                    </div>
                )
            case "Paternity Leave":
                return (
                    <div className="h-8 w-8 rounded-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        <ContactRound size={16} />
                    </div>
                )
        }
    }

    const handleRenderStatus = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-50 text-yellow-600 border border-yellow-200"
            case "Approved":
                return "bg-green-50 text-green-600 border border-green-200"
            case "Rejected":
                return "bg-red-50 text-red-600 border border-red-200"
        }
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {dataDashboard.map((item) => (
                    <div key={item.label} className={`bg-white p-4 rounded-xl shadow-sm border  flex items-center gap-4`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bgColor}`}>{item.icon}</div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500 uppercase">{item.label}</p>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col">
                <div className="p-5 border-b border-border-light dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-72 h-10">
                        <Search className="absolute inset-y-0 h-10 text-gray-600 left-0 pl-2 flex items-center pointer-events-none" />
                        <Input className="pl-8 h-full" placeholder="Search requests..." />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 ">
                        <Select>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Date Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="last-day">Last Day</SelectItem>
                                    <SelectItem value="last-week">Last Week</SelectItem>
                                    <SelectItem value="last-month">Last Month</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button>
                            Download <Download />
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                            <tr>
                                {dataHeader.map((header) => (
                                    <th className="px-6 py-4 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider" scope="col">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-surface-light dark:bg-surface-dark divide-y divide-neutral-200 dark:divide-neutral-700">
                            {data.map((request, index) => (
                                <tr
                                    key={request.id}
                                    className={`${index % 2 === 1 ? "bg-neutral-50/50 dark:bg-neutral-800/20" : ""} hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a className="text-sm font-medium text-primary hover:text-primary-hover hover:underline" href="#">
                                            {request.id}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 hidden sm:table-cell uppercase">{request.groupType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {handleRenderType(request.type)}
                                            <span className="text-sm text-neutral-900 dark:text-neutral-100">{request.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">{request.submitted}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100 hidden md:table-cell">{request.dates}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 hidden lg:table-cell">{request.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${handleRenderStatus(request.status)}`}>{request.status}</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button variant={"ghost"}>
                                            <Eye />
                                        </Button>
                                        <Button variant={"ghost"}>
                                            <Edit />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark px-4 py-3 flex items-center justify-between border-t border-border-light dark:border-border-dark sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">42</span> results
                            </p>
                        </div>
                        <div>
                            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                    href="#"
                                >
                                    <span className="sr-only">Previous</span>
                                    <span className="material-icons-outlined text-sm">chevron_left</span>
                                </a>
                                <a aria-current="page" className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                    1
                                </a>
                                <a
                                    className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    2
                                </a>
                                <a
                                    className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    3
                                </a>
                                <span className="relative inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    ...
                                </span>
                                <a
                                    className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                    href="#"
                                >
                                    8
                                </a>
                                <a
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                    href="#"
                                >
                                    <span className="sr-only">Next</span>
                                    <span className="material-icons-outlined text-sm">chevron_right</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:hidden">
                        <a
                            className="relative inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                            href="#"
                        >
                            Previous
                        </a>
                        <a
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                            href="#"
                        >
                            Next
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-4 text-center">
                <p className="text-xs text-neutral-400">© 2023 Enterprise HR System. All rights reserved.</p>
            </div>
        </div>
    )
}
