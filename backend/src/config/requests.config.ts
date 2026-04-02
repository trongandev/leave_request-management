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
  {
    creatorEmail: 'admin@lrm.com',
    formTemplateCode: 'ANNUAL_LEAVE',
    code: 'ANNUAL_LEAVE',
    title: 'ĐƠN XIN NGHỈ PHÉP NĂM',
    values: {
      reason: 'Nghỉ phép gia đình',
      fromDate: '2026-04-10',
      toDate: '2026-04-12',
      totalDays: 3,
      attachment: null,
    },
    status: RequestStatus.PENDING,
    currentStepOrder: 1,
  },
  {
    creatorEmail: 'admin@lrm.com',
    formTemplateCode: 'SICK_LEAVE',
    code: 'SICK_LEAVE',
    title: 'ĐƠN XIN NGHỈ BỆNH',
    values: {
      reason: 'Nghỉ bệnh có xác nhận bác sĩ',
      fromDate: '2026-03-20',
      toDate: '2026-03-21',
      totalDays: 2,
      attachment: 'medical-certificate.pdf',
    },
    status: RequestStatus.RETURNED,
    currentStepOrder: 1,
  },
  {
    creatorEmail: 'admin@lrm.com',
    formTemplateCode: 'BEREAVEMENT_CLOSE_FAMILY_LEAVE',
    code: 'BEREAVEMENT_CLOSE_FAMILY_LEAVE',
    title: 'ĐƠN XIN NGHỈ TANG CHẾ (GIA ĐÌNH GẦN)',
    values: {
      reason: 'Tang lễ người thân trực hệ',
      fromDate: '2026-02-01',
      toDate: '2026-02-03',
      totalDays: 3,
      attachment: null,
    },
    status: RequestStatus.APPROVED,
    currentStepOrder: 2,
  },
];
