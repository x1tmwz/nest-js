import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { IntimidatorsUsersModule } from './intimidators-users/intimidators-users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DoorsModule } from './doors/doors.module';
import { WorkDayModule } from './work-day/work-day.module';
import { UtilsModule } from './utils/utils.module';
import { WorkDaySummaryModule } from './work-day-summary/work-day-summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.dev.env'],
    }),
    TypeOrmModule.forRoot(),
    UtilsModule,
    AuthModule,
    IntimidatorsUsersModule,
    DoorsModule,
    WorkDayModule,
    WorkDaySummaryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
