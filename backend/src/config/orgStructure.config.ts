export const orgStructure = [
  {
    originName: 'Production',
    name: 'Sản xuất',
    code: 'PROD',
    positions: [
      {
        name: 'PW',
        fullName: 'Production Worker',
        description: 'Công nhân sản xuất',
        level: 1,
      },
      {
        name: 'LL',
        fullName: 'Line Leader',
        description: 'Trưởng chuyền',
        level: 3,
      },
      {
        name: 'PS',
        fullName: 'Production Supervisor',
        description: 'Giám sát sản xuất',
        level: 4,
      },
      {
        name: 'FM',
        fullName: 'Factory Manager',
        description: 'Giám đốc nhà máy',
        level: 7,
      },
    ],
  },
  {
    originName: 'Engineering',
    name: 'Kỹ thuật',
    code: 'TECH',
    positions: [
      {
        name: 'SWE',
        fullName: 'Software Engineer',
        description: 'Kỹ sư phần mềm',
        level: 2,
      },
      {
        name: 'TL',
        fullName: 'Technical Lead',
        description: 'Trưởng nhóm kỹ thuật',
        level: 4,
      },
      {
        name: 'CTO',
        fullName: 'Chief Technology Officer',
        description: 'Giám đốc công nghệ',
        level: 8,
      },
    ],
  },
  {
    originName: 'Human Resources',
    name: 'Nhân sự',
    code: 'HR',
    positions: [
      {
        name: 'HRA',
        fullName: 'HR Administrator',
        description: 'Hành chính nhân sự',
        level: 2,
      },
      {
        name: 'C&B',
        fullName: 'Comp & Benefits Specialist',
        description: 'Chuyên viên lương và phúc lợi',
        level: 3,
      },
      {
        name: 'HRM',
        fullName: 'HR Manager',
        description: 'Trưởng phòng nhân sự',
        level: 5,
      },
    ],
  },

  // Thêm bộ phận R&D
  {
    originName: 'Research & Development',
    name: 'R&D',
    code: 'RND',
    positions: [
      {
        name: 'RE',
        fullName: 'Research Engineer',
        description: 'Kỹ sư nghiên cứu',
        level: 2,
      },
      {
        name: 'RS',
        fullName: 'Research Scientist',
        description: 'Nhà nghiên cứu',
        level: 3,
      },
      {
        name: 'RDL',
        fullName: 'R&D Lead',
        description: 'Trưởng nhóm R&D',
        level: 5,
      },
      {
        name: 'RDM',
        fullName: 'R&D Manager',
        description: 'Trưởng phòng nghiên cứu & phát triển',
        level: 7,
      },
    ],
  },

  // Thêm bộ phận Kho & Vận chuyển
  {
    originName: 'Logistics',
    name: 'Kho & Vận chuyển',
    code: 'LOG',
    positions: [
      {
        name: 'WW',
        fullName: 'Warehouse Worker',
        description: 'Nhân viên kho',
        level: 1,
      },
      {
        name: 'PL',
        fullName: 'Picker / Loader',
        description: 'Người chọn và xếp hàng',
        level: 2,
      },
      {
        name: 'LS',
        fullName: 'Logistics Supervisor',
        description: 'Giám sát logistics',
        level: 4,
      },
      {
        name: 'LM',
        fullName: 'Logistics Manager',
        description: 'Quản lý vận chuyển & kho',
        level: 6,
      },
    ],
  },

  // Thêm bộ phận Quản lý chất lượng
  {
    originName: 'Quality Assurance',
    name: 'Quản lý chất lượng',
    code: 'QA',
    positions: [
      {
        name: 'QC',
        fullName: 'Quality Controller',
        description: 'Nhân viên kiểm tra chất lượng',
        level: 2,
      },
      {
        name: 'QAE',
        fullName: 'Quality Assurance Engineer',
        description: 'Kỹ sư đảm bảo chất lượng',
        level: 4,
      },
      {
        name: 'QAM',
        fullName: 'Quality Manager',
        description: 'Trưởng phòng quản lý chất lượng',
        level: 6,
      },
    ],
  },

  // Thêm bộ phận Kỹ thuật hệ thống
  {
    originName: 'Systems',
    name: 'Kỹ thuật hệ thống',
    code: 'SYS',
    positions: [
      {
        name: 'SEN',
        fullName: 'System Engineer',
        description: 'Kỹ sư hệ thống',
        level: 2,
      },
      {
        name: 'SLE',
        fullName: 'Systems Lead',
        description: 'Trưởng nhóm hệ thống',
        level: 5,
      },
      {
        name: 'SM',
        fullName: 'Systems Manager',
        description: 'Quản lý kỹ thuật hệ thống',
        level: 7,
      },
    ],
  },
];

//Level,Vai trò Hệ thống (Role),Chức năng UI (HUB Portal),Ghi chú
// 1 - 2,EMPLOYEE,Thấy thẻ: Công việc của tôi,Nhóm thực thi.
// 3 - 4,MANAGER,"Thấy thẻ: Công việc của tôi, Quản lý đội ngũ",Nhóm quản lý trực tiếp (Line Manager).
// 5 - 8,MANAGER / HR,"Thấy thẻ: Công việc của tôi, Quản lý đội ngũ, Quản trị nhân sự",Nhóm quản lý cấp cao hoặc bộ phận chuyên trách.
