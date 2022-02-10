import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultTake } from 'src/core/constants/basic.contant';
import { SuccessResponse } from 'src/core/dtos/success_response.dto';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { NotificationFilterDto } from './dtos/notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getNotificationById(id: string): Promise<Notification> {
    return this.notificationRepository.findOne(id);
  }

  async getNotifications(
    filter: NotificationFilterDto,
  ): Promise<[Notification[], number]> {
    const findOption: FindManyOptions<Notification> = {
      where: {},
      order: { updatedAt: 'DESC' },
      skip: filter.skip || 0,
      take: filter.take || defaultTake,
    };

    if (filter.keyword) {
      findOption.where = {
        title: ILike(`%${filter.keyword}%`),
        content: ILike(`%${filter.keyword}%`),
      };
    }

    if (filter.sender) {
      findOption.where['sender'] = filter.sender;
    }

    if (filter.receiver) {
      findOption.where['receiver'] = filter.receiver;
    }

    return this.notificationRepository.findAndCount(findOption);
  }

  async deleteNotification(id: string): Promise<SuccessResponse> {
    return this.notificationRepository
      .softDelete(id)
      .then(() => new SuccessResponse(true));
  }

  async saveNotification(notification: Notification): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }
}
