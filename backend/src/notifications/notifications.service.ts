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
      title: 'Don cho duyet moi',
      content: `Ban co don ${params.requestCode ?? params.requestId} dang cho duyet.`,
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
      title: 'Don da duyet qua 1 cap',
      content: `Don ${params.requestCode ?? params.requestId} vua duoc duyet them 1 cap.`,
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
      title: 'Don da duoc phe duyet',
      content: `Don ${params.requestCode ?? params.requestId} da duoc phe duyet hoan toan.`,
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
    const reasonSuffix = params.reason ? ` Ly do: ${params.reason}` : '';

    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.REQUEST_REJECTED,
      title: 'Don bi tu choi',
      content: `Don ${params.requestCode ?? params.requestId} da bi tu choi.${reasonSuffix}`,
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
    const reasonSuffix = params.reason ? ` Ly do: ${params.reason}` : '';

    return this.emit({
      recipientId: params.recipientId,
      senderId: this.normalizeSenderId(params.senderId),
      type: NotificationType.REQUEST_RETURNED,
      title: 'Don bi tra ve',
      content: `Don ${params.requestCode ?? params.requestId} can cap nhat lai thong tin.${reasonSuffix}`,
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
      title: 'Ban vua duoc uy quyen',
      content: 'Ban vua nhan uy quyen xu ly duyet don thay nguoi khac.',
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
      title: 'So du nghi phep da cap nhat',
      content: `So du nghi phep nam ${params.year} cua ban vua duoc cap nhat.`,
      link: '/profile/leave-balance',
      metadata: {
        leaveBalanceId: params.leaveBalanceId,
        year: params.year,
      },
    });
  }
}
