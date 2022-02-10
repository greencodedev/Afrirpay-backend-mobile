import { BadRequestException } from '@nestjs/common';
import {
  isDate,
  isDateString,
  isNotEmpty,
  isNumberString,
} from 'class-validator';
import { UpdateUserDto } from '../dtos/user.dto';

export const validateUpdateUserDto = (data: UpdateUserDto): UpdateUserDto => {
  if (!isNotEmpty(data)) {
    throw new BadRequestException(`User details required`);
  }

  if (!isNumberString(data.pin)) {
    throw new BadRequestException(`pin should be numeric`);
  }

  if (!isDate(data.dateOfBirth) && !isDateString(data.dateOfBirth)) {
    throw new BadRequestException(`Invalid dateOfBirth`);
  }

  return data;
};
