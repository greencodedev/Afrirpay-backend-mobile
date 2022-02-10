import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultTake } from 'src/core/constants/basic.contant';
import { SuccessResponse } from 'src/core/dtos/success_response.dto';
import { TablePaginationDto } from 'src/core/dtos/table_pagination.dto';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUsers(filterOpt: TablePaginationDto): Promise<[User[], number]> {
    const whereQuery: FindManyOptions<User> = {
      where: [
        { userName: ILike(`%${filterOpt.keyword}%`) },
        { firstname: ILike(`%${filterOpt.keyword}%`) },
        { lastname: ILike(`%${filterOpt.keyword}%`) },
      ],
      order: { updatedAt: 'DESC' },
      take: filterOpt.take || defaultTake,
      skip: filterOpt.skip || 0,
    };

    return this.userRepository.findAndCount(whereQuery);
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getUserByPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({ phone });
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<SuccessResponse> {
    return this.userRepository
      .softDelete(id)
      .then(() => new SuccessResponse(true));
  }
}
