import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reservations')
@Controller('reservations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova reserva' })
  create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    return this.reservationsService.create(createReservationDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar reservas do usuário' })
  findAll(@Request() req) {
    return this.reservationsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter reserva por ID' })
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar reserva' })
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar reserva' })
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Aceitar desafio de reserva' })
  acceptChallenge(@Param('id') id: string, @Request() req, @Body() body: { teamId: number }) {
    return this.reservationsService.acceptChallenge(+id, req.user.id, body.teamId);
  }
}

