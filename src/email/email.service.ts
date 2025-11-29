import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendPasswordResetEmailAsync(email: string, resetLink: string): Promise<void> {
    // Por enquanto, apenas loga o link. Implemente com SMTP real depois
    this.logger.log(`Link de reset de senha para ${email}: ${resetLink}`);
    // TODO: Implementar envio real de email usando SMTP
  }
}

