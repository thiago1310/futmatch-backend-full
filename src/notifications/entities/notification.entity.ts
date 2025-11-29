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
import { Reservation } from '../../reservations/entities/reservation.entity';
import { TipoNotificacao } from '../../common/enums/tipo-notificacao.enum';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  mensagem: string;

  @Column({
    type: 'enum',
    enum: TipoNotificacao,
  })
  tipo: TipoNotificacao;

  @Column({ default: false })
  lida: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  teamId: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamOpponentId: number;

  @Column({ nullable: true })
  reservationId?: number;

  @ManyToOne(() => Reservation)
  @JoinColumn({ name: 'reservationId' })
  reservation?: Reservation;

  @Column({ type: 'text', nullable: true })
  dadosExtras?: string;

  @Column({ default: false })
  permiteAcao: boolean;

  @Column({ nullable: true })
  acaoPositiva?: string;

  @Column({ nullable: true })
  acaoNegativa?: string;

  @Column({ nullable: true })
  urlAcao?: string;
}

