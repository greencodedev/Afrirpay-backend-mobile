import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/core/dtos/success_response.dto';
import { getFromDto } from 'src/core/utils/repository.util';
import { OtpService } from 'src/otp/otp.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async validateUserByPhoneNumber(phone: string): Promise<User> {
    return this.userService.getUserByPhone(phone).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to get user by phone number. ${err.message}`,
      );
    });
  }

  async login(user: User): Promise<string> {
    const { id, phone, verified } = user;
    try {
      return this.jwtService.sign({ id, phone, verified });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get jwt token`);
    }
  }

  async registerUser(data: RegisterDto): Promise<User> {
    const newUser = getFromDto<User>(data, new User());
    return this.userService.saveUser(newUser).then(async (user) => {
      await this.otpService.sendOtpToken(user.phone).catch(() => null);
      return user;
    });
  }

  async validateUserPinByPhone(phone: string, pin: string): Promise<User> {
    const user = await this.validateUserByPhoneNumber(phone);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (user.pin !== pin) {
      throw new BadRequestException(`pin incorrect`);
    }

    return user;
  }

  async savePin(user: User, pin: string): Promise<SuccessResponse> {
    return this.userService
      .saveUser({ ...user, pin })
      .then(() => new SuccessResponse(true))
      .catch((err) => new SuccessResponse(false, err.message));
  }
}
