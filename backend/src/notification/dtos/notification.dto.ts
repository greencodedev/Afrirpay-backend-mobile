import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TablePaginationDto } from 'src/core/dtos/table_pagination.dto';

export class NotificationDto {
  @ApiProperty({ type: String, required: false, example: 'Notification Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '619d1ba229809a778f22e83f',
    description: 'sender ID. It is null if sender is admin',
  })
  @IsOptional()
  @IsString()
  sender?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '619d1ba229809a778f22e83f',
    description: 'Receiver ID. It is null if notification is for everyone',
  })
  @IsOptional()
  @IsString()
  receiver?: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Notification content',
  })
  @IsOptional()
  @IsString()
  content?: string;
}

export class NotificationFilterDto extends TablePaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '619d1ba229809a778f22e83f',
    description: 'Filter by sender',
  })
  @IsOptional()
  @IsString()
  sender?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '619d1ba229809a778f22e83f',
    description: 'Filter by receiver',
  })
  @IsOptional()
  @IsString()
  receiver?: string;
}

export class PushNotificationDto {
  @ApiProperty({ type: String, required: true, description: 'FCM Token' })
  @IsString()
  @IsNotEmpty()
  fcmToken: string;

  @ApiProperty({
    type: NotificationDto,
    required: true,
    description: 'Push notification payload',
  })
  @IsString()
  @IsNotEmpty()
  payload: NotificationDto;
}
