import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Door } from './entities/door.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Door])],
  controllers: [DoorsController],
  providers: [DoorsService],
  exports:[DoorsService]

})
export class DoorsModule {}
