import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { TipoNotificacao } from '../common/enums/tipo-notificacao.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async findAll(userId: number, apenasNaoLidas: boolean = false): Promise<Notification[]> {
    const where: any = { userId };
    if (apenasNaoLidas) {
      where.lida = false;
    }
    return this.notificationsRepository.find({
      where,
      relations: ['reservation', 'team'],
      order: { dataCriacao: 'DESC' },
      take: 50,
    });
  }

  async findOne(id: number): Promise<Notification> {
    return this.notificationsRepository.findOne({
      where: { id },
      relations: ['reservation', 'team'],
    });
  }

  async marcarComoLida(id: number, userId: number): Promise<void> {
    const notification = await this.notificationsRepository.findOne({
      where: { id, userId },
    });
    if (notification && !notification.lida) {
      notification.lida = true;
      await this.notificationsRepository.save(notification);
    }
  }

  async marcarTodasComoLidas(userId: number): Promise<void> {
    await this.notificationsRepository.update(
      { userId, lida: false },
      { lida: true },
    );
  }

  async contarNaoLidas(userId: number): Promise<number> {
    return this.notificationsRepository.count({
      where: { userId, lida: false },
    });
  }

  async criarNotificacao(
    userId: number,
    teamId: number,
    teamOpponentId: number,
    tipo: TipoNotificacao,
    titulo: string,
    mensagem: string,
    reservationId?: number,
  ): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      userId,
      teamId,
      teamOpponentId,
      tipo,
      titulo,
      mensagem,
      reservationId,
      lida: false,
    });
    return this.notificationsRepository.save(notification);
  }
}

