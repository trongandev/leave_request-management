/* eslint-disable @typescript-eslint/no-unsafe-call */
// mail.service.ts
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendManagerReminder(
    apsDisplayId: string,
    creatorId: any,
    originalApproverId: any,
    request: any,
  ) {
    const values = request?.values ?? {};
    const managerName =
      originalApproverId?.fullName ?? originalApproverId?.name ?? '';
    const employeeName = creatorId?.fullName ?? creatorId?.name ?? '';
    const employeeAvatar =
      creatorId?.avatar ?? 'https://ui-avatars.com/api/?name=Employee';
    const employeePosition =
      creatorId?.positionId?.fullName ?? creatorId?.positionId?.name ?? '';
    const rawStartDate = values?.fromDate ?? values?.startDate ?? '';
    const rawEndDate = values?.toDate ?? values?.endDate ?? '';
    const startDate = new Date(rawStartDate).toLocaleDateString();
    const endDate = new Date(rawEndDate).toLocaleDateString();

    const totalDays = values?.totalDays ?? values?.amount ?? 0;
    const leaveReason =
      values?.reason ?? values?.leaveReason ?? 'No reason provided';
    const approvalLink = `https://lrm.io.vn/approvals/team-requests/${String(request?._id ?? '')}`;

    await this.mailerService.sendMail({
      // to: originalApproverId.email
      to: 'troandev@gmail.com', // Gửi email đến approver gốc
      subject: `[LRM] Nhắc nhở duyệt đơn cho ${employeeName}`,
      template: './reminder', // Tên file reminder.hbs trong thư mục templates
      context: {
        apsDisplayId,
        managerName,
        employeeName,
        employeeAvatar,
        employeePosition,
        startDate,
        endDate,
        totalDays,
        leaveReason,
        approvalLink,
      },
    });
  }
}
