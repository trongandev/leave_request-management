import { RequestStatus } from 'src/enum/request-status.enum';

export interface RequestSeedItem {
  creatorEmail: string;
  formTemplateCode: string;
  code: string;
  title: string;
  values: Record<string, unknown>;
  status: RequestStatus;
  currentStepOrder: number;
}

export const requestsSeed: RequestSeedItem[] = [
  // {
  //   creatorEmail: 'admin@lrm.com',
  //   formTemplateCode: 'PAID_LEAVE',
  //   code: 'PAID_LEAVE',
  //   title: 'ĐƠN XIN NGHỈ PHÉP',
  //   values: {
  //     reason: 'Nghỉ phép gia đình',
  //     fromDate: '2026-04-10',
  //     toDate: '2026-04-12',
  //     totalDays: 3,
  //     handoverTo: 'Nguyen Van B',
  //     handoverDepartment: 'Phong Ky Thuat',
  //     handoverContent: 'Ban giao ticket dang xu ly va tai lieu lien quan',
  //     attachment: 'handover-paid-leave.pdf',
  //   },
  //   status: RequestStatus.PENDING,
  //   currentStepOrder: 1,
  // },
  // {
  //   creatorEmail: 'admin@lrm.com',
  //   formTemplateCode: 'UNPAID_LEAVE',
  //   code: 'UNPAID_LEAVE',
  //   title: 'ĐƠN XIN NGHỈ KHÔNG LƯƠNG',
  //   values: {
  //     reason: 'Xu ly viec gia dinh trong thoi gian dai',
  //     fromDate: '2026-05-01',
  //     toDate: '2026-05-07',
  //     totalDays: 7,
  //     returnCommitment: 'Hoan tat backlog trong 2 ngay sau khi quay lai',
  //     handoverTo: 'Tran Thi C',
  //     handoverDepartment: 'Phong Van Hanh',
  //     handoverContent: 'Ban giao cong viec dinh ky va huong dan tam thoi',
  //     attachment: null,
  //   },
  //   status: RequestStatus.APPROVED,
  //   currentStepOrder: 1,
  // },
  // {
  //   creatorEmail: 'admin@lrm.com',
  //   formTemplateCode: 'RESIGNATION',
  //   code: 'RESIGNATION',
  //   title: 'ĐƠN XIN THÔI VIỆC',
  //   values: {
  //     submissionDate: '2026-04-02',
  //     resignFromDate: '2026-05-01',
  //     reason: 'Chuyen huong nghe nghiep ca nhan',
  //     handoverTo: 'Le Van D',
  //     handoverDepartment: 'Phong San Pham',
  //     attachment: 'resignation-note.pdf',
  //   },
  //   status: RequestStatus.RETURNED,
  //   currentStepOrder: 1,
  // },
];
