import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumberString, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String, required: false })
  @Optional()
  @IsString()
  userName?: string;

  @ApiProperty({ type: String, required: false })
  @Optional()
  @IsString()
  firstname?: string;

  @ApiProperty({ type: String, required: false })
  @Optional()
  @IsString()
  lastname?: string;

  @ApiProperty({ type: String, required: false })
  @Optional()
  @IsNumberString()
  @Length(4, 4)
  pin?: string;

  @ApiProperty({ type: String, required: false })
  @Optional()
  @IsString()
  countryCode?: string;

  @ApiProperty({ type: Date, required: false })
  @Optional()
  @IsDate()
  dateOfBirth?: Date;
}
