import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IntimidatorsUsersService } from './intimidators-users.service';
import { IntimidatorsUser } from './entities/intimidators-user.entity';

@Controller('intimidators-users')
export class IntimidatorsUsersController {
  constructor(
    private readonly intimidatorsUsersService: IntimidatorsUsersService,
  ) {}

  @Post()
  async create(@Body() createIntimidatorsUserDto: IntimidatorsUser) {
    await this.intimidatorsUsersService.create(
      createIntimidatorsUserDto,
    );
    return { body: 'ok' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req) {
    return this.intimidatorsUsersService.findOne(req.user.userId);
  }
}
