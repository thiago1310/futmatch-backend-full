import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GooglePlacesService } from './google-places.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('google-places')
@Controller('google-places')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GooglePlacesController {
  constructor(private readonly googlePlacesService: GooglePlacesService) {}

  @Get('search')
  @ApiOperation({ summary: 'Buscar quadras de futebol' })
  async search(@Query('location') location: string, @Query('radius') radius?: number) {
    return this.googlePlacesService.searchFootballCourtsAsync(location, radius);
  }
}

