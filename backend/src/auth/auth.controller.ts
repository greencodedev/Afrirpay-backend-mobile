import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Request,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/core/dtos/success_response.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt.guard';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import {
  LoginDto,
  PinNumberDto,
  RegisterDto,
  RestPinDto,
} from './dtos/auth.dto';
import { AuthValidator } from './validation/auth.validate';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authValidator: AuthValidator,
  ) {}

  @Post('/login')
  @ApiOkResponse({ type: String })
  async login(@Body() loginData: LoginDto): Promise<string> {
    const validLoginData = this.authValidator.loginValidate(loginData);
    const user = await this.authService.validateUserByPhoneNumber(
      validLoginData.phone,
    );
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return this.authService.login(user);
  }

  @Post('/register')
  @ApiOkResponse({ type: String })
  async register(@Body() registerData: RegisterDto): Promise<string> {
    const validData = this.authValidator.registerValidate(registerData);
    const duplicateUser = await this.authService.validateUserByPhoneNumber(
      validData.phone,
    );
    if (duplicateUser) {
      throw new BadRequestException(`Phone number is already used`);
    }
    const newUser = await this.authService
      .registerUser(validData)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to add new user. ${err.message}`,
        );
      });
    return this.authService.login(newUser);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create-pin')
  @ApiOkResponse({ type: User })
  async addPin(
    @Request() request,
    @Body() pinData: PinNumberDto,
  ): Promise<SuccessResponse> {
    const { user } = request;
    const { pin } = this.authValidator.pinNumberValidate(pinData);

    const userData = await this.authService.validateUserByPhoneNumber(
      user.phone,
    );
    return this.authService.savePin(userData, pin);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/validate-pin')
  @ApiOkResponse({ type: User })
  async validatePin(
    @Request() request,
    @Body() pinData: PinNumberDto,
  ): Promise<User> {
    const { user } = request;
    const { pin } = this.authValidator.pinNumberValidate(pinData);

    return this.authService.validateUserPinByPhone(user.phone, pin);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/reset-pin')
  @ApiOkResponse({ type: SuccessResponse })
  async resetPin(
    @Request() request,
    @Body() data: RestPinDto,
  ): Promise<SuccessResponse> {
    const { user } = request;
    const { oldPin, newPin } = this.authValidator.resetPinValidate(data);
    const userData = await this.authService.validateUserPinByPhone(
      user.phone,
      oldPin,
    );

    return this.authService.savePin(userData, newPin);
  }
}
