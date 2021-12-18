import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IntimidatorsUser,
  fullKeyList,
} from './entities/intimidators-user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class IntimidatorsUsersService {
  constructor(
    @InjectRepository(IntimidatorsUser)
    private IntimidatorsUserRepository: Repository<IntimidatorsUser>,
  ) {}

  private validateUserInfo(user: IntimidatorsUser) {
    for (const key of fullKeyList) {
      if (!user[key]) {
        throw new BadRequestException(`user ${key} is missing`);
      }
    }
  }
  private validatePhone(phone: string) {
    if (!phone || (phone && (phone.length < 7 || phone.length > 10))) {
      throw new BadRequestException('Phone must have 10 numbers');
    }
    const reg = new RegExp('^0[0-9]{1}([0-9]{1})[0-9]{7}$');
    if (!reg.test(phone)) {
      throw new BadRequestException('Phone number is unvalid');
    }
  }
  private validateTentacles(tentacles: number) {
    if (!tentacles || (tentacles && tentacles > 999)) {
      throw new BadRequestException(
        'monster can have less then 1000 tentacles',
      );
    }
  }
  private validateFullName(fullName: string) {
    if (!fullName || (fullName && fullName.length > 100)) {
      throw new BadRequestException(
        'Full name  must contain less then 100 letter',
      );
    }
  }
  private validateUserName(user: string): void {
    if (!user || (user && user.length > 100)) {
      throw new BadRequestException(
        'User name must contain less then 100 letter',
      );
    }
    const atLeastNonAlphanumericChar = user.match(/[\W_]/);
    if (atLeastNonAlphanumericChar) {
      throw new BadRequestException(
        'User name must no contain non alphanumeric letter',
      );
    }
  }

  private validatePassword(password: string): void {
    if (
      !password ||
      (password && (password.length < 8 || password.length > 30))
    ) {
      throw new BadRequestException('Password must have 8-30 letters');
    }
    const atLeastOneUpperCaseLetter = password.match(/[A-Z]/);
    const atLeastOneDigit = password.match(/\d/);
    const atLeastNonAlphanumericChar = password.match(/[\W_]/);
    if (!atLeastOneUpperCaseLetter) {
      throw new BadRequestException(
        'Password should contain at least one upper case letter',
      );
    }
    if (!atLeastOneDigit) {
      throw new BadRequestException(
        'Password should contain at least one digit',
      );
    }
    if (!atLeastNonAlphanumericChar) {
      throw new BadRequestException(
        'Password should contain at least one non alphanumeric letter',
      );
    }
  }
 

  async create(
    createIntimidatorsUserDto: IntimidatorsUser,
  ): Promise<IntimidatorsUser> {
    this.validateUserInfo(createIntimidatorsUserDto);
    this.validateUserName(createIntimidatorsUserDto.userName);
    this.validatePassword(createIntimidatorsUserDto.password);
    this.validatePhone(createIntimidatorsUserDto.phone);
    this.validateTentacles(createIntimidatorsUserDto.tentacles);
    this.validateFullName(createIntimidatorsUserDto.fullName);
    const password = await bcrypt.hash(createIntimidatorsUserDto.password, 8);
    const isUserNameAlreadyTaken = await this.findUserName(
      createIntimidatorsUserDto.userName,
    );
    if (isUserNameAlreadyTaken) {
      throw new BadRequestException('User name already exiting');
    }
    const user = await this.IntimidatorsUserRepository.create({
      ...createIntimidatorsUserDto,
      password,
    });
    return this.IntimidatorsUserRepository.save(user);
  }

  findAll(): Promise<IntimidatorsUser[]> {
    return this.IntimidatorsUserRepository.find();
  }

  findOne(id: string): Promise<IntimidatorsUser> {
    return this.IntimidatorsUserRepository.findOne(id);
  }
  findUserName(userName: string): Promise<IntimidatorsUser> {
    return this.IntimidatorsUserRepository.findOne({ where: { userName } });
  }

  async remove(id: string): Promise<void> {
    await this.IntimidatorsUserRepository.delete(id);
  }
}
