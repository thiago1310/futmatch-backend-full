import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ nullable: true })
  fotoUrl?: string;

  @Column({ length: 20, nullable: true })
  corPrimaria?: string;

  @Column({ length: 20, nullable: true })
  corSecundaria?: string;

  @Column({ length: 20, nullable: true })
  corTerciaria?: string;

  @Column({ nullable: true })
  idadeMinima?: number;

  @Column({ nullable: true })
  idadeMaxima?: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.teams)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Reservation, (reservation) => reservation.team)
  reservations: Reservation[];

  get faixaIdadeDisplay(): string {
    if (this.idadeMinima || this.idadeMaxima) {
      return `${this.idadeMinima ?? 16} - ${this.idadeMaxima ?? 60} anos`;
    }
    return 'Todas as idades';
  }
}

