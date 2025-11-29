import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { StatusReservation } from '../common/enums/status-reservation.enum';
import { CourtsService } from '../courts/courts.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    private courtsService: CourtsService,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: number): Promise<Reservation> {
    // Verificar conflitos de horário
    const conflictingReservations = await this.reservationsRepository.find({
      where: {
        courtId: createReservationDto.courtId,
        status: Not(StatusReservation.Cancelada),
      },
    });

    const startTime = new Date(createReservationDto.dataHora);
    const endTime = new Date(startTime.getTime() + createReservationDto.duracaoHoras * 60 * 60 * 1000);

    for (const conflictingReservation of conflictingReservations) {
      const conflictStart = new Date(conflictingReservation.dataHora);
      const conflictEnd = new Date(conflictStart.getTime() + conflictingReservation.duracaoHoras * 60 * 60 * 1000);

      if (startTime < conflictEnd && endTime > conflictStart) {
        throw new BadRequestException('Este horário já está reservado');
      }
    }

    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      userId,
      status: StatusReservation.Pendente,
    });
    return this.reservationsRepository.save(reservation);
  }

  async findAll(userId?: number): Promise<Reservation[]> {
    if (userId) {
      return this.reservationsRepository.find({
        where: [
          { userId },
          { opponentUserId: userId },
        ],
        relations: ['court', 'team', 'opponentTeam', 'user', 'opponentUser'],
        order: { dataHora: 'DESC' },
      });
    }
    return this.reservationsRepository.find({
      relations: ['court', 'team', 'opponentTeam', 'user', 'opponentUser'],
      order: { dataHora: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: ['court', 'team', 'opponentTeam', 'user', 'opponentUser'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    await this.reservationsRepository.update(id, updateReservationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationsRepository.remove(reservation);
  }

  async acceptChallenge(id: number, userId: number, teamId: number): Promise<Reservation> {
    const reservation = await this.findOne(id);
    if (reservation.status !== StatusReservation.Pendente) {
      throw new BadRequestException('Reserva não está disponível para aceitar desafio');
    }
    if (reservation.userId === userId) {
      throw new BadRequestException('Você não pode aceitar seu próprio desafio');
    }

    reservation.opponentUserId = userId;
    reservation.opponentTeamId = teamId;
    reservation.status = StatusReservation.Confirmada;
    return this.reservationsRepository.save(reservation);
  }
}

