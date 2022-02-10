import { BadRequestException } from '@nestjs/common';
import { isEmpty, isNotEmpty, matches } from 'class-validator';
import { NotificationDto } from '../dtos/notification.dto';

export const validateNotificationDto = (
  data: NotificationDto,
): NotificationDto => {
  if (
    isNotEmpty(data.receiver) &&
    !matches(data.receiver, new RegExp('^[0-9a-fA-F]{24}$'))
  ) {
    throw new BadRequestException(`Invalid receiver id`);
  }

  if (
    isNotEmpty(data.sender) &&
    !matches(data.sender, new RegExp('^[0-9a-fA-F]{24}$'))
  ) {
    throw new BadRequestException(`Invalid sender id`);
  }

  if (isEmpty(data.content)) {
    throw new BadRequestException(`content requried`);
  }
  return data;
};
