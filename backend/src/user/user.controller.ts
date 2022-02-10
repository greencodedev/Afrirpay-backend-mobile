import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { isEmpty, isUUID } from 'class-validator';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { PaginatorDto } from 'src/core/dtos/paginator.dto';
import { SuccessResponse } from 'src/core/dtos/success_response.dto';
import { TablePaginationDto } from 'src/core/dtos/table_pagination.dto';
import { getFromDto } from 'src/core/utils/repository.util';
import { validateTableID } from 'src/core/validation/validate_table_id';
import { UpdateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { validateUpdateUserDto } from './validation/user.validate';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @ApiOkResponse({ type: [User] })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers().catch((err) => {
      throw new InternalServerErrorException(
        `Failed to get all users. ${err.message}`,
      );
    });
  }

  @Get('/search')
  @ApiOkResponse({ type: [User] })
  async searchUsers(
    @Query() filterOpt: TablePaginationDto,
  ): Promise<PaginatorDto<User>> {
    const [data, count] = await this.userService
      .findUsers(filterOpt)
      .catch((err) => {
        throw new InternalServerErrorException(
          `Failed to search users. ${err.message}`,
        );
      });

    return { data, count };
  }

  @Get('/:userId')
  @ApiOkResponse({ type: User })
  @ApiParam({
    type: String,
    required: true,
    example: '05198f71-cb6e-41cf-a64a-5657e9f89889',
    name: 'userId',
    description: 'user ID',
  })
  async getUserById(@Param('userId') userId: string): Promise<User> {
    if (isEmpty(userId)) {
      throw new BadRequestException(`userId requried`);
    }

    await validateTableID(userId, User);

    return this.userService.getUserById(userId).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to get user by id. ${err.message}`,
      );
    });
  }

  @Put('/:userId')
  @ApiOkResponse({ type: User })
  @ApiParam({
    type: String,
    required: true,
    example: '05198f71-cb6e-41cf-a64a-5657e9f89889',
    name: 'userId',
    description: 'user ID',
  })
  async updateUser(
    @Param('userId') userId: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    const newUserData = validateUpdateUserDto(data);
    const oldUser = await this.getUserById(userId);
    const newUser = getFromDto<User>(newUserData, oldUser);
    return this.userService.saveUser(newUser).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to update user. ${err.message}`,
      );
    });
  }

  @Delete('/:userId')
  @ApiOkResponse({ type: SuccessResponse })
  @ApiParam({
    type: String,
    required: true,
    example: '05198f71-cb6e-41cf-a64a-5657e9f89889',
    name: 'userId',
    description: 'user ID',
  })
  async deleteUserById(
    @Param('userId') userId: string,
  ): Promise<SuccessResponse> {
    const user = await this.getUserById(userId);
    return this.userService.deleteUser(userId).catch((err) => {
      throw new InternalServerErrorException(
        `Failed to delete use by id. ${err.message}`,
      );
    });
  }
}
