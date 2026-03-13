// // hooks/useProjects.js
// import { useQuery } from "@tanstack/react-query"

// export const useProjects = (filters) => {
//     return useQuery({
//         queryKey: projectKeys.list(filters),
//         queryFn: () => fetchProjectsFromAPI(filters),
//         // Chỉ fetch khi có filter hợp lệ (Conditional Fetching)
//         enabled: !!filters.categoryId,
//         // Giữ dữ liệu cũ trong khi đang fetch dữ liệu mới (Tránh nhảy Loading)
//         placeholderData: (previousData) => previousData,
//         staleTime: 5 * 60 * 1000, // Dữ liệu "tươi" trong 5 phút
//     })
// }
