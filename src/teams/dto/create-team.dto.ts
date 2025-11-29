import { IsString, IsOptional, MaxLength, Min, Max, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  nome: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  corPrimaria?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  corSecundaria?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  corTerciaria?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(16)
  @Max(60)
  idadeMinima?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(16)
  @Max(60)
  idadeMaxima?: number;
}

