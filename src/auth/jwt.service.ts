import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      nome: user.nome,
    };
    return this.jwtService.sign(payload);
  }

  generatePasswordResetToken(): string {
    return (
      this.generateRandomString() + '-' + this.generateRandomString()
    );
  }

  private generateRandomString(): string {
    return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }
}

