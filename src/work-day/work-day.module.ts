import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkDayService } from './work-day.service';
import { WorkDayController } from './work-day.controller';
import { WorkDay } from './entities/work-day.entity';
import { DoorsModule } from 'src/doors/doors.module';


@Module({
  imports:[DoorsModule,TypeOrmModule.forFeature([WorkDay])],
  controllers: [WorkDayController],
  providers: [WorkDayService]
})
export class WorkDayModule {}
