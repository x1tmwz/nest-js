import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { IntimidatorsUsersModule } from './intimidators-users/intimidators-users.module';



@Module({
  imports: [TypeOrmModule.forRoot(), IntimidatorsUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
