import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntimidatorsUsersService } from './intimidators-users.service';
import { IntimidatorsUser } from './entities/intimidators-user.entity';

@Controller('intimidators-users')
export class IntimidatorsUsersController {
  constructor(private readonly intimidatorsUsersService: IntimidatorsUsersService) {}

  @Post()
  async create(@Body() createIntimidatorsUserDto: IntimidatorsUser) {
    await this.intimidatorsUsersService.create(createIntimidatorsUserDto);
    return {body:"ok"}

    //return this.intimidatorsUsersService.create(createIntimidatorsUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intimidatorsUsersService.findOne(id);
  }



  
}
