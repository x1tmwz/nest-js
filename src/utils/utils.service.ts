import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  constructor() {}

  generateTodayRange(): { start: number; end: number } {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return { start: start.getTime() / 1000, end: end.getTime() / 1000 };
  }
  getYearsFromDateRange(start:number,end:number){
    return (end - start) / (365 * 24 * 60 * 60 * 1000);
  }
}
