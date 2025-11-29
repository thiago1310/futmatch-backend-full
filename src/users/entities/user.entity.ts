import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Notification } from '../../notifications/entities/notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ length: 100, nullable: true })
  cidade?: string;

  @Column({ length: 100, nullable: true })
  estado?: string;

  @Column({ length: 10, nullable: true })
  cep?: string;

  @Column('double precision', { nullable: true })
  latitude?: number;

  @Column('double precision', { nullable: true })
  longitude?: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column({ nullable: true })
  passwordResetToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetTokenExpiry?: Date;

  @Column({ nullable: true })
  selectedTeamId?: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'selectedTeamId' })
  selectedTeam?: Team;

  @OneToMany(() => Team, (team) => team.user)
  teams: Team[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}

