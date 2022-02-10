import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginatorDto } from 'src/core/dtos/paginator.dto';
import { SuccessResponse } from 'src/core/dtos/success_response.dto';
import { getFromDto } from 'src/core/utils/repository.util';
import { validateTableID } from 'src/core/validation/validate_table_id';
import {
  NotificationDto,
  NotificationFilterDto,
  PushNotificationDto,
} from './dtos/notification.dto';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { validateNotificationDto } from './validation/notification';
import * as firebaseAdmin from 'firebase-admin';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

@ApiTags('Notifications')
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/notifications')
  @ApiOkResponse({ type: [Notification] })
  async getNotifications(
    @Request() request,
    @Query() query: NotificationFilterDto,
  ): Promise<PaginatorDto<Notification>> {
    return this.notificationService
      .getNotifications(query)
      .then((result) => ({ data: result[0], count: result[1] }))
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to get notifications. ${err.message}`,
        );
      });
  }

  @Get('/notifications/:notificationID')
  @ApiParam({
    type: String,
    required: true,
    example: '05198f71-cb6e-41cf-a64a-5657e9f89889',
    name: 'notificationID',
    description: 'notification id',
  })
  @ApiOkResponse({ type: Notification })
  async getNotificationDetails(
    @Request() request,
    @Param('notificationID') notificationID: string,
  ): Promise<Notification> {
    const notification = await this.notificationService
      .getNotificationById(notificationID)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to get notification details. ${err.message}`,
        );
      });

    if (!notification) {
      throw new NotFoundException(
        `Notification(ID: ${notificationID}) not found`,
      );
    }

    return notification;
  }

  @Post('/notifications')
  @ApiOkResponse({ type: Notification })
  async createNotification(
    @Request() request,
    @Body() data: NotificationDto,
  ): Promise<Notification> {
    const validData = validateNotificationDto(data);
    const newNotification = getFromDto<Notification>(
      validData,
      new Notification(),
    );
    return this.notificationService
      .saveNotification(newNotification)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to save new notification. ${err.message}`,
        );
      });
  }

  @Delete('/notifications/:notificationID')
  @ApiParam({
    type: String,
    required: true,
    example: '05198f71-cb6e-41cf-a64a-5657e9f89889',
    name: 'notificationID',
    description: 'notification id',
  })
  @ApiOkResponse({ type: SuccessResponse })
  async deleteNotification(
    @Request() request,
    @Param('notificationID') notificationID: string,
  ): Promise<SuccessResponse> {
    await validateTableID(notificationID, Notification);

    return this.notificationService
      .deleteNotification(notificationID)
      .catch((err) => new SuccessResponse(true, err.message));
  }

  @Put('/notifications/:notificationID')
  @ApiParam({
    type: String,
    required: true,
    example: '05198f71-cb6e-41cf-a64a-5657e9f89889',
    name: 'notificationID',
    description: 'notification id',
  })
  @ApiOkResponse({ type: Notification })
  async updateNotification(
    @Request() request,
    @Param('notificationID') notificationID: string,
    @Body() data: NotificationDto,
  ): Promise<Notification> {
    await validateTableID(notificationID, Notification);
    const oldNotification = await this.notificationService
      .getNotificationById(notificationID)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to get notification details. ${err.message}`,
        );
      });

    const newNotification = getFromDto<Notification>(data, oldNotification);
    newNotification.id = oldNotification.id;
    return this.notificationService
      .saveNotification(newNotification)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to update notification. ${err.message}`,
        );
      });
  }

  @Patch('/notifications/:notificationID/read')
  @ApiParam({
    type: String,
    required: true,
    example: '05198f71-cb6e-41cf-a64a-5657e9f89889',
    name: 'notificationID',
    description: 'notification id',
  })
  @ApiOkResponse({ type: SuccessResponse })
  async readNotification(
    @Request() request,
    @Param('notificationID') notificationID: string,
  ): Promise<SuccessResponse> {
    await validateTableID(notificationID, Notification);
    const newNotification = await this.notificationService
      .getNotificationById(notificationID)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to get notification details. ${err.message}`,
        );
      });

    newNotification.isRead = true;

    return this.notificationService
      .saveNotification(newNotification)
      .then(() => new SuccessResponse(true))
      .catch((err) => new SuccessResponse(false, err.message));
  }

  @Post('/notifications/send')
  @ApiOkResponse({ type: Notification })
  async sendNotification(
    @Request() request,
    @Body() body: PushNotificationDto,
  ): Promise<Notification> {
    try {
      const payload: MessagingPayload = {
        notification: {
          body: body.payload.content,
          title: body.payload.title,
        },
      };
      return firebaseAdmin
        .messaging()
        .sendToDevice(body.fcmToken, payload)
        .then(() => {
          const newNotification = body.payload as Notification;
          newNotification.isRead = false;
          return this.notificationService.saveNotification(newNotification);
        });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to send push notification`,
      );
    }
  }
}
