import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OtpService {
  constructor(private readonly userService: UserService) {}

  async sendOtpToken(phone): Promise<boolean> {
    const user = await this.userService.getUserByPhone(phone).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to get user details by phone. ${err.message}`,
      );
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return true;
  }

  async verifyToken(userId, otpToken): Promise<User> {
    if (otpToken === '0000') {
      const user = await this.userService.getUserById(userId).catch((err) => {
        throw new InternalServerErrorException(
          `Failed get user details by id. ${err.message}`,
        );
      });

      return this.userService
        .saveUser({ ...user, verified: true })
        .catch((err) => {
          throw new InternalServerErrorException(
            `Failed to update user status. ${err.message}`,
          );
        });
    } else {
      throw new BadRequestException(`Failed to verify otp token.`);
    }
  }
}
