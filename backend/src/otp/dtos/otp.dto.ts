import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class OtpTokenDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: '1234',
    maxLength: 4,
    minLength: 4,
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(4, 4)
  otpToken: string;
}
