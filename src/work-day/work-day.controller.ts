import { Controller, Get, Post, Body,UseGuards,Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WorkDayService } from './work-day.service';
import { CreateWorkDayDto } from './dto/create-work-day.dto';


@Controller('work-day')
export class WorkDayController {
  constructor(private readonly workDayService: WorkDayService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWorkDayDto: CreateWorkDayDto) {
    return this.workDayService.create(createWorkDayDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get("/work-enegry")
  getTodayEnergy(@Request() req){
    return this.workDayService.getMyTodayExperience(req.userId);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get("/doors")
  getWorkDayDoors(@Request() req){
    return this.workDayService.getOpenWorkDayDoors(req.user.userId,req.user.join);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  getWorkDayHistory(@Request() req){
    

  }

}
