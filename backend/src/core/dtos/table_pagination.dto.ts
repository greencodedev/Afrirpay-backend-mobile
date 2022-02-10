import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class TablePaginationDto extends PaginationDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  keyword?: string;
}
