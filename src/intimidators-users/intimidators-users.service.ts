import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntimidatorsUser } from './entities/intimidators-user.entity';

@Injectable()
export class IntimidatorsUsersService {
  constructor(
    @InjectRepository(IntimidatorsUser)
    private IntimidatorsUserRepository: Repository<IntimidatorsUser>,
  ) {}

  async create(createIntimidatorsUserDto: any): Promise<IntimidatorsUser[]> {
    const user = await this.IntimidatorsUserRepository.create(
      createIntimidatorsUserDto
    );
    return user;
  }

  findAll(): Promise<IntimidatorsUser[]> {
    return this.IntimidatorsUserRepository.find();
  }

  findOne(id: string): Promise<IntimidatorsUser> {
    return this.IntimidatorsUserRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.IntimidatorsUserRepository.delete(id);
  }
}
