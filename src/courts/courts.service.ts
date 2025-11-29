import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from './entities/court.entity';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';

@Injectable()
export class CourtsService {
  constructor(
    @InjectRepository(Court)
    private courtsRepository: Repository<Court>,
  ) {}

  async create(createCourtDto: CreateCourtDto): Promise<Court> {
    const court = this.courtsRepository.create(createCourtDto);
    return this.courtsRepository.save(court);
  }

  async findAll(activeOnly: boolean = true): Promise<Court[]> {
    const where = activeOnly ? { ativa: true } : {};
    return this.courtsRepository.find({ where });
  }

  async findOne(id: number): Promise<Court> {
    const court = await this.courtsRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });
    if (!court) {
      throw new NotFoundException(`Court with ID ${id} not found`);
    }
    return court;
  }

  async findByGooglePlaceId(googlePlaceId: string): Promise<Court | null> {
    return this.courtsRepository.findOne({
      where: { googlePlaceId },
    });
  }

  async update(id: number, updateCourtDto: UpdateCourtDto): Promise<Court> {
    await this.courtsRepository.update(id, updateCourtDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const court = await this.findOne(id);
    await this.courtsRepository.remove(court);
  }
}

