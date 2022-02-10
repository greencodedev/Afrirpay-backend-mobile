import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/core/dtos/success_response.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt.guard';
import { User } from 'src/user/entities/user.entity';
import { OtpTokenDTO } from './dtos/otp.dto';
import { OtpService } from './otp.service';
import { OtpValidator } from './validation/otp.validate';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly validator: OtpValidator,
  ) {}

  @Post('/sendOtp')
  @ApiOkResponse({ type: SuccessResponse })
  async sendOtp(@Request() request): Promise<SuccessResponse> {
    const { user } = request;
    return this.otpService
      .sendOtpToken(user.phone)
      .then(() => new SuccessResponse(true))
      .catch((err) => new SuccessResponse(false, err.message));
  }

  @Post('/verifyOtp')
  @ApiOkResponse({ type: User })
  async verifyOtp(
    @Request() request,
    @Body() data: OtpTokenDTO,
  ): Promise<User> {
    const { user } = request;
    const { otpToken } = this.validator.verifyTokenValidate(data);
    return this.otpService.verifyToken(user.id, otpToken);
  }
}
