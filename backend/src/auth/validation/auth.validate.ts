import { BadRequestException } from '@nestjs/common';
import {
  isEmpty,
  isMobilePhone,
  isNotEmptyObject,
  isNumber,
  isNumberString,
  isPhoneNumber,
  length,
} from 'class-validator';
import {
  LoginDto,
  PinNumberDto,
  RegisterDto,
  RestPinDto,
} from '../dtos/auth.dto';

export class AuthValidator {
  loginValidate = (loginData: LoginDto): LoginDto => {
    if (!isNotEmptyObject(loginData)) {
      throw new BadRequestException(`login details required`);
    }

    if (isEmpty(loginData.phone)) {
      throw new BadRequestException(`phone number required`);
    }

    if (!isPhoneNumber(loginData.phone) && !isMobilePhone(loginData.phone)) {
      throw new BadRequestException(`Invalid phone number`);
    }

    return loginData;
  };

  registerValidate = (registerData: RegisterDto): RegisterDto => {
    if (isEmpty(registerData.userName)) {
      throw new BadRequestException(`userName required`);
    }

    if (isEmpty(registerData.phone)) {
      throw new BadRequestException(`phone number required`);
    }

    if (
      !isPhoneNumber(registerData.phone) &&
      !isMobilePhone(registerData.phone)
    ) {
      throw new BadRequestException(`Invalid phone number`);
    }

    return registerData;
  };

  pinNumberValidate = (pinData: PinNumberDto): PinNumberDto => {
    if (isEmpty(pinData.pin)) {
      throw new BadRequestException(`pin required`);
    }

    if (!isNumber(pinData.pin) && !isNumberString(pinData.pin)) {
      throw new BadRequestException(`Invalid pin`);
    }

    if (!length(pinData.pin, 4, 4)) {
      throw new BadRequestException(`Invalid pin length`);
    }

    return pinData;
  };

  resetPinValidate = (data: RestPinDto): RestPinDto => {
    if (isEmpty(data.oldPin)) {
      throw new BadRequestException(`old pin number required`);
    }

    if (isEmpty(data.newPin)) {
      throw new BadRequestException(`new pin number required`);
    }

    if (isEmpty(data.confirmNewPin)) {
      throw new BadRequestException(`confirm pin number required`);
    }

    if (data.newPin !== data.confirmNewPin) {
      throw new BadRequestException(
        `new pin number is not same as confirm pin number`,
      );
    }

    if (
      !length(data.oldPin, 4, 4) ||
      !length(data.newPin, 4, 4) ||
      !length(data.confirmNewPin, 4, 4)
    ) {
      throw new BadRequestException(`Invalid pin number length`);
    }

    return data;
  };
}
