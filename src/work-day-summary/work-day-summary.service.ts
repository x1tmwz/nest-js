import { Injectable} from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkDaySummary } from './entities/work-day-summary.entity';


@Injectable()
export class WorkDaySummaryService {
  constructor(
    @InjectRepository(WorkDaySummary) private WorkDaySummaryRepository: Repository<WorkDaySummary>) {}

}
