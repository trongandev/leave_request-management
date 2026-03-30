/*
 * OLD orgStructure backup (kept for quick revert)
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
*/

export const orgStructure = [
  {
    originName: 'Executive Office',
    name: 'Ban điều hành',
    code: 'EXEC',
    positions: [
      {
        name: 'CEO',
        fullName: 'Chief Executive Officer',
        description: 'Tổng giám đốc',
        level: 0,
      },
    ],
  },
  {
    originName: 'Human Resources',
    name: 'Nhân sự',
    code: 'HR',
    positions: [
      {
        name: 'HRM',
        fullName: 'HR Manager',
        description: 'Trưởng phòng nhân sự',
        level: 1,
      },
      {
        name: 'REC',
        fullName: 'Recruiter',
        description: 'Chuyên viên tuyển dụng',
        level: 2,
      },
      {
        name: 'TRS',
        fullName: 'Training Specialist',
        description: 'Chuyên viên đào tạo',
        level: 2,
      },
      {
        name: 'HRA',
        fullName: 'HR Admin',
        description: 'Nhân viên hành chính nhân sự',
        level: 2,
      },
    ],
  },
  {
    originName: 'Research & Development',
    name: 'R&D',
    code: 'RND',
    positions: [
      {
        name: 'RDM',
        fullName: 'R&D Manager',
        description: 'Trưởng phòng nghiên cứu và phát triển',
        level: 1,
      },
      {
        name: 'RSE',
        fullName: 'Research Engineer',
        description: 'Kỹ sư nghiên cứu',
        level: 2,
      },
      {
        name: 'PDV',
        fullName: 'Product Developer',
        description: 'Chuyên viên phát triển sản phẩm',
        level: 2,
      },
    ],
  },
  {
    originName: 'Logistics',
    name: 'Kho và vận chuyển',
    code: 'LOG',
    positions: [
      {
        name: 'LGM',
        fullName: 'Logistics Manager',
        description: 'Trưởng phòng logistics',
        level: 1,
      },
      {
        name: 'WHM',
        fullName: 'Warehouse Manager',
        description: 'Quản lý kho',
        level: 2,
      },
      {
        name: 'DLV',
        fullName: 'Delivery Staff',
        description: 'Nhân viên giao nhận',
        level: 2,
      },
      {
        name: 'WHS',
        fullName: 'Warehouse Staff',
        description: 'Nhân viên kho trực thuộc Warehouse Manager',
        level: 3,
      },
    ],
  },
  {
    originName: 'Quality Assurance',
    name: 'Quản lý chất lượng',
    code: 'QA',
    positions: [
      {
        name: 'QAM',
        fullName: 'QA Manager',
        description: 'Trưởng phòng QA',
        level: 1,
      },
      {
        name: 'QAE',
        fullName: 'QA Engineer',
        description: 'Kỹ sư QA',
        level: 2,
      },
      {
        name: 'QAS',
        fullName: 'QA Staff',
        description: 'Nhân viên QA',
        level: 2,
      },
    ],
  },
  {
    originName: 'IT & System',
    name: 'CNTT và hệ thống',
    code: 'SYS',
    positions: [
      {
        name: 'ITM',
        fullName: 'IT/System Manager',
        description: 'Trưởng phòng IT và hệ thống',
        level: 1,
      },
      {
        name: 'SAD',
        fullName: 'System Admin',
        description: 'Quản trị hệ thống',
        level: 2,
      },
      {
        name: 'NWE',
        fullName: 'Network Engineer',
        description: 'Kỹ sư mạng',
        level: 2,
      },
      {
        name: 'ITS',
        fullName: 'IT Support',
        description: 'Nhân viên hỗ trợ IT',
        level: 2,
      },
    ],
  },
];

// Level 0: CEO
// Level 1: Department Managers
// Level 2: Specialist and Staff positions
// Level 3: Warehouse Staff under Warehouse Manager
