import { AbstractEntity } from 'src/core/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ type: 'varchar', nullable: true })
  userName: string;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'varchar', nullable: true })
  pin: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  referredBy: string;

  @Column({ type: 'varchar', nullable: true })
  referralCode: string;

  @Column({ type: 'varchar', nullable: true })
  countryCode: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true })
  userAvatar: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  deviceHash: string;

  @Column({ type: 'text', nullable: true })
  lastLogin: string;
}
