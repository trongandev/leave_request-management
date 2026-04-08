import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginate } from '../common/utils/pagination.util';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './notifications.schema';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  // System notifications use null senderId by convention.
  private readonly SYSTEM_SENDER_ID: null = null;

  private normalizeSenderId(senderId?: string | null): string | null {
    return senderId ?? this.SYSTEM_SENDER_ID;
  }

  private buildLink(requestId?: string): string | undefined {
    if (!requestId) {
      return undefined;
    }

    return `/requests/detail/${requestId}`;
  }

  private async createRecord(payload: CreateNotificationDto) {
    const created = await this.notificationModel.create({
      ...payload,
      senderId: this.normalizeSenderId(payload.senderId),
      isRead: payload.isRead ?? false,
      metadata: payload.metadata ?? {},
    });

    return { item: created };
  }

  // Core event helper so upstream modules don't duplicate payload format.
  async emit(payload: CreateNotificationDto) {
    return this.createRecord(payload);
  }

  async create(createNotificationDto: CreateNotificationDto) {
    return this.createRecord(createNotificationDto);
  }

  async findAll(queryNotificationDto: QueryNotificationDto) {
    const filter: Record<string, unknown> = {};

    if (queryNotificationDto.recipientId) {
      filter.recipientId = queryNotificationDto.recipientId;
    }

    if (queryNotificationDto.senderId) {
      filter.senderId = queryNotificationDto.senderId;
    }

    if (queryNotificationDto.type) {
      filter.type = queryNotificationDto.type;
    }

    if (typeof queryNotificationDto.isRead === 'boolean') {
      filter.isRead = queryNotificationDto.isRead;
    }

    if (typeof queryNotificationDto.isSystem === 'boolean') {
      filter.senderId = queryNotificationDto.isSystem
        ? this.SYSTEM_SENDER_ID
        : { $ne: this.SYSTEM_SENDER_ID };
    }

    const paged = await paginate(
      this.notificationModel,
      queryNotificationDto,
      filter,
      {
        sort: { createdAt: -1 },
      },
    );

    // Keep list responses object-first instead of returning array directly.
    return {
      items: paged.data,
      meta: paged.meta,
    };
  }

  async findOne(id: string) {
    const notification = await this.notificationModel.findById(id).exec();

    if (!notification) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return { item: notification };
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const updated = await this.notificationModel
      .findByIdAndUpdate(
        id,
        {
          ...updateNotificationDto,
          ...(Object.prototype.hasOwnProperty.call(
            updateNotificationDto,
            'senderId',
          )
            ? {
                senderId: this.normalizeSenderId(
                  updateNotificationDto.senderId,
                ),
              }
            : {}),
        },
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return { item: updated };
  }

  async markAsRead(id: string) {
    const updated = await this.notificationModel
      .findByIdAndUpdate(id, { isRead: true }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return { item: updated };
  }

  async remove(id: string) {
    const deleted = await this.notificationModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return { item: deleted };
  }

  async notifyRequestAssigned(params: {
    recipientId: string;
    requestId: string;
    requestCode?: string;
    stepOrder?: number;
    senderId?: string | null;
  }) {
    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.REQUEST_ASSIGNED,
      title: 'Đơn chờ duyệt mới',
      content: `Bạn có đơn ${params.requestCode ?? params.requestId} đang chờ duyệt.`,
      link: this.buildLink(params.requestId),
      metadata: {
        requestId: params.requestId,
        stepOrder: params.stepOrder,
      },
    });
  }

  async notifyStepApproved(params: {
    recipientId: string;
    requestId: string;
    requestCode?: string;
    stepOrder?: number;
    senderId?: string | null;
  }) {
    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.STEP_APPROVED,
      title: 'Đơn đã duyệt qua 1 cấp',
      content: `Đơn ${params.requestCode ?? params.requestId} vừa được duyệt thêm 1 cấp.`,
      link: this.buildLink(params.requestId),
      metadata: {
        requestId: params.requestId,
        stepOrder: params.stepOrder,
      },
    });
  }

  async notifyRequestApproved(params: {
    recipientId: string;
    requestId: string;
    requestCode?: string;
    senderId?: string | null;
  }) {
    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.REQUEST_APPROVED,
      title: 'Đơn đã được phê duyệt',
      content: `Đơn ${params.requestCode ?? params.requestId} đã được phê duyệt hoàn toàn.`,
      link: this.buildLink(params.requestId),
      metadata: {
        requestId: params.requestId,
      },
    });
  }

  async notifyRequestRejected(params: {
    recipientId: string;
    requestId: string;
    requestCode?: string;
    reason?: string;
    senderId?: string | null;
  }) {
    const reasonSuffix = params.reason ? ` Lý do: ${params.reason}` : '';

    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.REQUEST_REJECTED,
      title: 'Đơn bị từ chối',
      content: `Đơn ${params.requestCode ?? params.requestId} đã bị từ chối.${reasonSuffix}`,
      link: this.buildLink(params.requestId),
      metadata: {
        requestId: params.requestId,
        reason: params.reason,
      },
    });
  }

  async notifyRequestReturned(params: {
    recipientId: string;
    requestId: string;
    requestCode?: string;
    reason?: string;
    senderId?: string | null;
  }) {
    const reasonSuffix = params.reason ? ` Lý do: ${params.reason}` : '';

    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.REQUEST_RETURNED,
      title: 'Đơn bị trả về',
      content: `Đơn ${params.requestCode ?? params.requestId} cần cập nhật lại thông tin.${reasonSuffix}`,
      link: this.buildLink(params.requestId),
      metadata: {
        requestId: params.requestId,
        reason: params.reason,
      },
    });
  }

  async notifyDelegationReceived(params: {
    recipientId: string;
    delegationId: string;
    fromUserId: string;
  }) {
    return this.emit({
      recipientId: params.recipientId,
      senderId: params.fromUserId,
      type: NotificationType.DELEGATION_RECEIVED,
      title: 'Bạn vừa được ủy quyền',
      content: 'Bạn vừa nhận ủy quyền xử lý duyệt đơn thay người khác.',
      link: '/settings/delegations',
      metadata: {
        delegationId: params.delegationId,
        fromUserId: params.fromUserId,
      },
    });
  }

  async notifyLeaveBalanceUpdated(params: {
    recipientId: string;
    leaveBalanceId: string;
    year: number;
    senderId?: string | null;
  }) {
    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.LEAVE_BALANCE_UPDATED,
      title: 'Số dư nghỉ phép đã cập nhật',
      content: `Số dư nghỉ phép năm ${params.year} của bạn vừa được cập nhật.`,
      link: '/profile/leave-balance',
      metadata: {
        leaveBalanceId: params.leaveBalanceId,
        year: params.year,
      },
    });
  }
}
