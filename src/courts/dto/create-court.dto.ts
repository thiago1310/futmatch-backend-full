import { IsString, IsNumber, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourtDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  nome: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty()
  @IsString()
  localizacao: string;

  @ApiProperty()
  @IsNumber()
  precoPorHora: number;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  ativa?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  googlePlaceId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  googleRating?: number;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isFromGoogle?: boolean;
}

