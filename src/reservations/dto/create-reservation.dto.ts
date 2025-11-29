import { IsDate, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dataHora: Date;

  @ApiProperty({ default: 1 })
  @IsInt()
  @Min(1)
  duracaoHoras: number;

  @ApiProperty()
  @IsNumber()
  courtId: number;

  @ApiProperty()
  @IsNumber()
  teamId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  observacoes?: string;
}

