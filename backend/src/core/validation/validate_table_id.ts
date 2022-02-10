import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isEmpty, isUUID } from 'class-validator';
import { EntityTarget, getRepository } from 'typeorm';

export const validateTableID = async (
  id: string,
  entity: EntityTarget<any>,
): Promise<boolean> => {
  if (isEmpty(id)) {
    throw new BadRequestException(`id required`);
  }

  if (!isUUID(id)) {
    throw new BadRequestException(`Invalid id`);
  }

  const data = getRepository(entity)
    .findOne(id)
    .catch((err) => {
      throw new InternalServerErrorException(
        `Failed to get by id. ${err.message} `,
      );
    });
  if (!data) {
    throw new NotFoundException(`Non-existing`);
  }

  return true;
};
