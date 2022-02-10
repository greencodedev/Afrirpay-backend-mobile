import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, required: true, example: '+14167876637' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

export class RegisterDto {
  @ApiProperty({ type: String, required: true, example: '+14167876637' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ type: String, required: true, example: 'userName' })
  @IsNotEmpty()
  @IsString()
  userName: string;
}

export class PinNumberDto {
  @ApiProperty({ type: String, required: true, example: '1234' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  pin: string;
}

export class RestPinDto {
  @ApiProperty({ type: String, required: true, example: '1234' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  oldPin: string;

  @ApiProperty({ type: String, required: true, example: '1234' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  newPin: string;

  @ApiProperty({ type: String, required: true, example: '1234' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  confirmNewPin: string;
}
