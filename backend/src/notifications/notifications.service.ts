import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginate } from '../common/utils/pagination.util';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './notifications.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  findAll(queryNotificationDto: QueryNotificationDto) {
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

    return paginate(this.notificationModel, queryNotificationDto, filter, {
      sort: { createdAt: -1 },
    });
  }

  async findOne(id: string) {
    const notification = await this.notificationModel.findById(id).exec();

    if (!notification) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const updated = await this.notificationModel
      .findByIdAndUpdate(id, updateNotificationDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return updated;
  }

  async markAsRead(id: string) {
    const updated = await this.notificationModel
      .findByIdAndUpdate(id, { isRead: true }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.notificationModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Notification ${id} not found`);
    }

    return deleted;
  }
}
