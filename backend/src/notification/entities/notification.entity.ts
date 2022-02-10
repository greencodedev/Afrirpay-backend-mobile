import { AbstractEntity } from 'src/core/entities/abstract.entity';
import { Column, Entity } from 'typeorm';
import { NotificationDto } from '../dtos/notification.dto';

@Entity('notifications')
export class Notification extends AbstractEntity {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  sender: string;

  @Column({ type: 'varchar', nullable: true })
  receiver: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'text' })
  content: string;

  toDto(): NotificationDto {
    return {
      title: this.title,
      sender: this.sender,
      receiver: this.receiver,
      content: this.content,
    };
  }
}
