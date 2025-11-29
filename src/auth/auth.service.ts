import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtTokenService } from './jwt.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    const token = this.jwtTokenService.generateToken(user);
    return {
      access_token: token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        throw new BadRequestException('Este email já está cadastrado');
      }

      const hashedPassword = await bcrypt.hash(registerDto.senha, 10);
      const user = await this.usersService.create({
        nome: registerDto.nome,
        email: registerDto.email,
        senha: hashedPassword,
        telefone: registerDto.telefone || null,
        cidade: registerDto.cidade || null,
        estado: registerDto.estado || null,
        cep: registerDto.cep || null,
      });

      const token = this.jwtTokenService.generateToken(user);
      return {
        access_token: token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar usuário: ' + error.message);
    }
  }
}

