import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateWorkDayDto } from './dto/create-work-day.dto';
import { Repository, Between } from 'typeorm';
import { WorkDay } from './entities/work-day.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from 'src/utils/utils.service';
import { DoorsService } from 'src/doors/doors.service';

@Injectable()
export class WorkDayService {
  constructor(
    @InjectRepository(WorkDay) private WorkDayRepository: Repository<WorkDay>,
    private UtilsService: UtilsService,
    private DoorsService: DoorsService,
  ) {}

  private async getExperience(monsterId: string, start: number, end: number) {
    return this.WorkDayRepository.query(
      'select count(*) * 20 as exp from work_day where date > ? and date < ? and monsterId = ?',
      [start, end, monsterId],
    );
  }

  async create(createWorkDayDto: CreateWorkDayDto) {
    const workDay = this.WorkDayRepository.create(createWorkDayDto);
    try {
      await this.WorkDayRepository.save(workDay);
      return 'This action adds a new workDay';
    } catch (e) {
      return e.message;
    }
  }

  getMyTodayExperience(monsterId: string) {
    const { start, end } = this.UtilsService.generateTodayRange();
    return this.getExperience(monsterId, start, end);
  }

  async getOpenWorkDayDoors(monsterId: string, monsterExp: number) {
    const { start, end } = this.UtilsService.generateTodayRange();
    try {
      const experienceForToday = await this.getExperience(
        monsterId,
        start,
        end,
      );
      const msg = `You gain ${experienceForToday} / ${monsterExp} energy units for today`;
      if (experienceForToday >= monsterExp) {
        return { doors: [], msg };
      }
      const doors = await this.DoorsService.findWorkDayDoors(start, end);
      return { doors, msg };
    } catch (e) {
      console.log(e);
      return e.code;
    }
  }

  private validateAndAdjustmentFilters(filters: {
    start?: number;
    end?: number;
    isAccomplishDailyGoal?: boolean;
  }) {
    if (!filters.start || !filters.end) {
      const { start, end } = this.UtilsService.generateTodayRange();
      filters.start = start;
      filters.end = end;
    }
    if (filters.start > filters.end) {
      throw new BadRequestException('You date range is invalid');
    }
    if (!filters.hasOwnProperty('isAccomplishDailyGoal')) {
      filters.isAccomplishDailyGoal = false;
    }
    return filters;
  }

  async getWorkDayHistory(filters: {
    start?: number;
    end?: number;
    isAccomplishDailyGoal?: boolean;
  }) {
    filters = this.validateAndAdjustmentFilters(filters);
    
  }
}
