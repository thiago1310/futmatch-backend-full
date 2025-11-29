import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('courts')
export class Court {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column()
  localizacao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precoPorHora: number;

  @Column({ default: true })
  ativa: boolean;

  @Column({ nullable: true })
  @Index()
  googlePlaceId?: string;

  @Column('double precision', { nullable: true })
  latitude?: number;

  @Column('double precision', { nullable: true })
  longitude?: number;

  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  googleRating?: number;

  @Column({ default: false })
  isFromGoogle: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.court)
  reservations: Reservation[];
}

