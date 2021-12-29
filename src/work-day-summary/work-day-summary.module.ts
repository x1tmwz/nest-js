import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkDaySummaryService } from './work-day-summary.service';
import { WorkDaySummary } from './entities/work-day-summary.entity';
import { WorkDaySummaryController } from './work-day-summary.controller';




@Module({
  imports:[TypeOrmModule.forFeature([WorkDaySummary])],
  providers: [WorkDaySummaryService],
  controllers:[WorkDaySummaryController]
})
export class WorkDaySummaryModule {}
