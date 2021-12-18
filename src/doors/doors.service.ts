import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilsService } from 'src/utils/utils.service';
import { Door } from './entities/door.entity';

@Injectable()
export class DoorsService {
  constructor(
    @InjectRepository(Door) private DoorsRepository: Repository<Door>,
    private UtilsService: UtilsService,
  ) {}

  async create(createDoorDto: CreateDoorDto) {
    const createDoor = await this.DoorsRepository.create(createDoorDto);
    try {
      await this.DoorsRepository.save(createDoor);
      return 'This action adds a new door';
    } catch (e) {
      throw new BadRequestException(e.code);
    }
  }

  async createMany(doors: CreateDoorDto[]) {
    const createDoors = await this.DoorsRepository.create(doors);
    try {
      await this.DoorsRepository.save(createDoors);
      return 'This action adds a new door';
    } catch (e) {
      throw new BadRequestException(e.code);
    }
  }

  findWorkDayDoors(start:number,end:number): Promise<Door[]> {
    return this.DoorsRepository.query(
      'select * from door where id NOT in (select doorId from work_day where UNIX_TIMESTAMP(date) > ? and UNIX_TIMESTAMP(date) < ? and doorId is not null ) limit 15; ',
      [start, end],
    );
  }

  findAll(): Promise<Door[]> {
    return this.DoorsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} door`;
  }

  update(id: number, updateDoorDto: UpdateDoorDto) {
    return `This action updates a #${id} door`;
  }

  remove(id: number) {
    return `This action removes a #${id} door`;
  }
}
