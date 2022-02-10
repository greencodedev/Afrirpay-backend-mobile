import { BadRequestException } from '@nestjs/common';
import { isEmpty, isNumber, isNumberString } from 'class-validator';
import { OtpTokenDTO } from '../dtos/otp.dto';

export class OtpValidator {
  verifyTokenValidate = (data: OtpTokenDTO): OtpTokenDTO => {
    if (isEmpty(data.otpToken)) {
      throw new BadRequestException(`otpToken required`);
    }

    if (!isNumber(data.otpToken) && !isNumberString(data.otpToken)) {
      throw new BadRequestException(`Invalid otp token`);
    }

    if (data.otpToken.length !== 4) {
      throw new BadRequestException(`Invalid otp token length`);
    }

    return data;
  };
}
