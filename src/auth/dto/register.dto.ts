import { IsEmail, IsString, MinLength, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @MaxLength(100)
  nome: string;

  @ApiProperty({ example: 'usuario@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty({ example: '(11) 99999-9999', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cidade?: string;

  @ApiProperty({ example: 'SP', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  estado?: string;

  @ApiProperty({ example: '12345-678', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cep?: string;
}

