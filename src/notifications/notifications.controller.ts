import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar notificações do usuário' })
  findAll(@Request() req, @Query('apenasNaoLidas') apenasNaoLidas?: string) {
    return this.notificationsService.findAll(
      req.user.id,
      apenasNaoLidas === 'true',
    );
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Contar notificações não lidas' })
  async contarNaoLidas(@Request() req) {
    const count = await this.notificationsService.contarNaoLidas(req.user.id);
    return { count };
  }

  @Post(':id/read')
  @ApiOperation({ summary: 'Marcar notificação como lida' })
  marcarComoLida(@Param('id') id: string, @Request() req) {
    return this.notificationsService.marcarComoLida(+id, req.user.id);
  }

  @Post('read-all')
  @ApiOperation({ summary: 'Marcar todas as notificações como lidas' })
  marcarTodasComoLidas(@Request() req) {
    return this.notificationsService.marcarTodasComoLidas(req.user.id);
  }
}

