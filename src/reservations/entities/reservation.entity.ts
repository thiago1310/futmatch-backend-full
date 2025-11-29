import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Team } from '../../teams/entities/team.entity';
import { Court } from '../../courts/entities/court.entity';
import { StatusReservation } from '../../common/enums/status-reservation.enum';
import { ResultadoPartida } from '../../common/enums/resultado-partida.enum';
import { StatusResultado } from '../../common/enums/status-resultado.enum';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  dataHora: Date;

  @Column({ default: 1 })
  duracaoHoras: number;

  @Column({
    type: 'enum',
    enum: StatusReservation,
    default: StatusReservation.Pendente,
  })
  status: StatusReservation;

  @Column({ type: 'text', nullable: true })
  observacoes?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.reservations)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  courtId: number;

  @ManyToOne(() => Court, (court) => court.reservations)
  @JoinColumn({ name: 'courtId' })
  court: Court;

  @Column({ nullable: true })
  opponentTeamId?: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'opponentTeamId' })
  opponentTeam?: Team;

  @Column({ nullable: true })
  opponentUserId?: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'opponentUserId' })
  opponentUser?: User;

  // Resultado da partida
  @Column({
    type: 'enum',
    enum: ResultadoPartida,
    nullable: true,
  })
  resultadoTime1?: ResultadoPartida;

  @Column({
    type: 'enum',
    enum: ResultadoPartida,
    nullable: true,
  })
  resultadoTime2?: ResultadoPartida;

  @Column({ nullable: true })
  golsTime1?: number;

  @Column({ nullable: true })
  golsTime2?: number;

  @Column({ type: 'text', nullable: true })
  observacoesPartida?: string;

  @Column({ type: 'timestamp', nullable: true })
  dataResultado?: Date;

  @Column({ default: false })
  resultadoInformadoTime1: boolean;

  @Column({ default: false })
  resultadoInformadoTime2: boolean;

  @Column({ type: 'timestamp', nullable: true })
  dataResultadoTime1?: Date;

  @Column({ type: 'timestamp', nullable: true })
  dataResultadoTime2?: Date;

  @Column({ nullable: true })
  golsTime1_InformadoPeloTime1?: number;

  @Column({ nullable: true })
  golsTime2_InformadoPeloTime1?: number;

  @Column({ nullable: true })
  golsTime1_InformadoPeloTime2?: number;

  @Column({ nullable: true })
  golsTime2_InformadoPeloTime2?: number;

  @Column({ nullable: true })
  golsTime1Final?: number;

  @Column({ nullable: true })
  golsTime2Final?: number;

  @Column({
    type: 'enum',
    enum: ResultadoPartida,
    nullable: true,
  })
  resultadoTime1Final?: ResultadoPartida;

  @Column({
    type: 'enum',
    enum: ResultadoPartida,
    nullable: true,
  })
  resultadoTime2Final?: ResultadoPartida;

  @Column({
    type: 'enum',
    enum: StatusResultado,
    default: StatusResultado.Pendente,
  })
  statusResultado: StatusResultado;

  @Column({ type: 'timestamp', nullable: true })
  dataResultadoFinal?: Date;

  get resultadoInformado(): boolean {
    return this.resultadoInformadoTime1 && this.resultadoInformadoTime2;
  }

  get resultadoConfirmado(): boolean {
    return this.statusResultado === StatusResultado.Confirmado;
  }

  get temConflito(): boolean {
    return this.statusResultado === StatusResultado.Conflito;
  }
}

