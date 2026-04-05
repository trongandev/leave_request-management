import { Loader } from "lucide-react";
import PaginationUI from "./PaginationUI";

interface Props {
    data?: any;
    columns?: string[];
    handlePageChange?: (page: number) => void;
    isLoading?: boolean;
    children?: React.ReactNode;
}

export default function CTable({ data, columns, handlePageChange, isLoading, children }: Props) {
    console.log(data);
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-xs border bg-card  overflow-hidden ">
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse overflow-x-auto">
                    <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                            {columns ? (
                                <>
                                    {columns?.map((column) => (
                                        <th key={column} className="py-5 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">
                                            {column}
                                        </th>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {Object.keys(data?.data[0] || {}).map((column) => (
                                        <th key={column} className="py-5 px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">
                                            {column}
                                        </th>
                                    ))}
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-sm max-h-185 overflow-y-auto">
                        {isLoading && (
                            <tr>
                                <td colSpan={columns?.length || Object.keys(data?.data[0] || {}).length} className="h-125 w-full">
                                    <div className="flex items-center justify-center text-gray-600 h-full">
                                        <Loader className="animate-spin" />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {!isLoading && children ? (
                            children
                        ) : (
                            <>
                                {data?.data.map((item: any, index: number) => (
                                    <tr key={index}>
                                        {Object.keys(item).map((column) => (
                                            <td key={column} className="py-4 px-6 text-sm text-neutral-500">
                                                {typeof item[column] === "object" ? "[Object]" : item[column]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {(data?.length == 0 || data?.data?.length == 0) && (
                                    <tr>
                                        <td colSpan={columns?.length || Object.keys(data?.data[0] || {}).length} className="h-125 w-full">
                                            <div className="flex items-center justify-center text-gray-600 h-full">No data available</div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
            {handlePageChange && (
                <div className="bg-surface-light dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-700 px-6 py-4">
                    <PaginationUI pagination={data?.meta} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    );
}
