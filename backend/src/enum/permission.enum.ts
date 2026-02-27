// Ý TƯỞNG TẠO PERMISSION: hệ thống sẽ có endpoint để async các Permission có trong file này lưu vào MongooDb, như vậy file này rất quan trọng, tạo tiền đề cho hệ thống
//Vì sao lại không tạo feature CRUD lun trên UI, đỡ phải vào đây sửa???
// Vấn đề Vì nếu Admin tự ý thêm một quyền tên là HACK_SYSTEM trên UI nhưng trong Code của bạn không có chỗ nào check @RequirePermissions('HACK_SYSTEM') thì quyền đó cũng vô dụng.

//Lời khuyên: Hãy coi Enum trong Code là "Gốc". Mỗi khi bạn thêm 1 dòng code mới cần quyền mới, hãy cập nhật Enum, sau đó viết 1 script tự động đồng bộ (Sync) Enum đó vào bảng permissions trong DB.

export const PERMISSIONS_METADATA = [
  // MODULE ĐƠN TỪ
  {
    code: 'CREATE_LEAVE',
    description: 'Tạo đơn xin nghỉ mới',
    module: 'LEAVE',
  },
  {
    code: 'READ_OWN_LEAVE',
    description: 'Xem danh sách đơn của chính mình',
    module: 'LEAVE',
  },
  {
    code: 'UPDATE_OWN_LEAVE',
    description: 'Cập nhật đơn của mình (khi chờ duyệt)',
    module: 'LEAVE',
  },
  {
    code: 'DELETE_OWN_LEAVE',
    description: 'Xóa đơn của chính mình',
    module: 'LEAVE',
  },

  // MODULE PHÊ DUYỆT
  {
    code: 'READ_ALL_LEAVE',
    description: 'Xem tất cả đơn từ trong hệ thống',
    module: 'APPROVAL',
  },
  {
    code: 'APPROVE_LEAVE',
    description: 'Phê duyệt đơn xin nghỉ',
    module: 'APPROVAL',
  },
  {
    code: 'REJECT_LEAVE',
    description: 'Từ chối đơn xin nghỉ',
    module: 'APPROVAL',
  },
  {
    code: 'FORWARD_LEAVE',
    description: 'Chuyển tiếp đơn lên cấp trên',
    module: 'APPROVAL',
  },

  // MODULE CẤU HÌNH & BÁO CÁO
  {
    code: 'VIEW_REPORT',
    description: 'Xem báo cáo tổng hợp nghỉ phép',
    module: 'REPORT',
  },
  {
    code: 'MANAGE_LEAVE_TYPES',
    description: 'Quản lý các loại hình nghỉ phép',
    module: 'CONFIG',
  },

  // MODULE QUẢN TRỊ
  {
    code: 'MANAGE_USERS',
    description: 'Quản lý danh sách nhân viên',
    module: 'ADMIN',
  },
  {
    code: 'MANAGE_ROLES',
    description: 'Quản lý vai trò và phân quyền',
    module: 'ADMIN',
  },
  {
    code: 'MANAGE_DEPARTMENTS',
    description: 'Quản lý sơ đồ phòng ban',
    module: 'ADMIN',
  },
];

// Tạo một Object giả lập Enum để bạn dùng trong Code: Permission.CREATE_LEAVE
export const Permission = Object.fromEntries(
  PERMISSIONS_METADATA.map((p) => [p.code, p.code]),
) as { [K in (typeof PERMISSIONS_METADATA)[number]['code']]: K };
