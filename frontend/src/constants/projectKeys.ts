// Lưu các biến tĩnh, Query Keys Factory

// quản lí các keys của users khi sử dụng useQuery @Tanstack
export const userKeys = {
    all: ["users"],
    //   lists: () => [...userKeys.all, 'list'],
    //   list: (filters) => [...userKeys.lists(), { filters }],
    //   details: () => [...userKeys.all, 'detail'],
    //   detail: (id) => [...userKeys.details(), id],
}
