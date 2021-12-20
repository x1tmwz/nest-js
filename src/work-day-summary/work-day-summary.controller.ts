import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WorkDaySummaryService } from './work-day-summary.service';


@Controller('work-day-summary')
export class WorkDaySummaryController {
  constructor(private readonly workDaySummaryService: WorkDaySummaryService) {}

  
}
