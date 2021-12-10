import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntimidatorsUsersService } from './intimidators-users.service';
import { IntimidatorsUsersController } from './intimidators-users.controller';
import { IntimidatorsUser } from './entities/intimidators-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IntimidatorsUser])],
  controllers: [IntimidatorsUsersController],
  providers: [IntimidatorsUsersService],
})
export class IntimidatorsUsersModule {}
