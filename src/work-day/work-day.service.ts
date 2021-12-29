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
      'select count(*) * 20 as exp from work_day where UNIX_TIMESTAMP(date) > ? and UNIX_TIMESTAMP(date) < ? and monsterId = ?',
      [start, end, monsterId],
    );
  }
  private getMonsterExperienceBaseOnJoin(join: number) {
    const years = this.UtilsService.getYearsFromDateRange(
      join,
      new Date().getTime(),
    );
    let exp = 100;
    if (years <= 1) {
      return exp;
    }
    for (let i = 0; i < years; i++) {
      exp += 20;
    }
    return exp;
  }

  private isDoorAlreadyBeenVisitByMonster(
    workDay: CreateWorkDayDto,
  ) {
    const { start, end } = this.UtilsService.generateTodayRange();
    return this.WorkDayRepository.findOne({
      where: {
        date: Between(
          new Date(start * 1000).toISOString(),
          new Date(end * 1000).toISOString(),
        ),
        door: workDay.door,
      },
    });
    
  }
  private validateWorkDay(workDay: CreateWorkDayDto) {
    if (!workDay.door) {
      throw new BadRequestException('Please send door:id');
    }
  }

  async create(monsterId:number, createWorkDayDto: CreateWorkDayDto) {
    this.validateWorkDay(createWorkDayDto);
    const door = (await this.isDoorAlreadyBeenVisitByMonster(createWorkDayDto));
    if(door){
      return "Sorry this door already taken"
    }
    const workDay = this.WorkDayRepository.create({monster:monsterId,door:createWorkDayDto.door});
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

  async getOpenWorkDayDoors(monsterId: string, monsterJoin: number) {
    const { start, end } = this.UtilsService.generateTodayRange();
    const monsterExp = this.getMonsterExperienceBaseOnJoin(monsterJoin);
    try {
      const { exp } = (await this.getExperience(monsterId, start, end))[0];
      const msg = `You gain ${exp} / ${monsterExp} energy units for today`;
      if (exp >= monsterExp) {
        return { doors: [], msg };
      }
      const doors = await this.DoorsService.findWorkDayDoors(start, end);
      return { doors, msg };
    } catch (e) {
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
