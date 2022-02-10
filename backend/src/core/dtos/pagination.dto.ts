import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ type: Number, required: false })
  @Optional()
  @IsNumber()
  readonly skip?: number;

  @ApiProperty({ type: Number, required: false })
  @Optional()
  @IsNumber()
  readonly take?: number;
}
