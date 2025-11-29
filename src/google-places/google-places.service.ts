import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Court } from '../courts/entities/court.entity';
import { CourtsService } from '../courts/courts.service';

@Injectable()
export class GooglePlacesService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api/place';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private courtsService: CourtsService,
  ) {
    this.apiKey = this.configService.get<string>('GOOGLE_PLACES_API_KEY') || '';
  }

  async searchFootballCourtsAsync(location: string, radius: number = 15000): Promise<Court[]> {
    try {
      // Geocode location
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${this.apiKey}`;
      const geocodeResponse = await firstValueFrom(
        this.httpService.get(geocodeUrl),
      );
      const geocodeData = geocodeResponse.data;

      if (geocodeData?.results?.length > 0) {
        const firstResult = geocodeData.results[0];
        const lat = firstResult.geometry.location.lat;
        const lng = firstResult.geometry.location.lng;
        return this.getNearbyFootballCourtsAsync(lat, lng, radius);
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar quadras:', error);
      return [];
    }
  }

  async getNearbyFootballCourtsAsync(lat: number, lng: number, radius: number = 15000): Promise<Court[]> {
    const courts: Court[] = [];
    const keywords = [
      'quadra de futebol society',
      'campo de futebol',
      'quadra esportiva',
      'centro esportivo',
      'arena esportiva',
      'futebol society',
    ];

    for (const keyword of keywords) {
      try {
        const textSearchUrl = `${this.baseUrl}/textsearch/json?query=${encodeURIComponent(keyword + ' ' + lat + ',' + lng)}&location=${lat},${lng}&radius=${radius}&key=${this.apiKey}`;
        const response = await firstValueFrom(
          this.httpService.get(textSearchUrl),
        );
        const data = response.data;

        if (data?.status === 'OK' && data.results) {
          for (const place of data.results) {
            if (!courts.find(c => c.googlePlaceId === place.place_id)) {
              courts.push(this.convertGooglePlaceToCourt(place));
            }
          }
        }

        if (courts.length >= 6) break;
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Erro na busca '${keyword}':`, error);
      }
    }

    return courts.slice(0, 6);
  }

  private convertGooglePlaceToCourt(place: any): Court {
    const estimatedPrice = this.estimatePrice(place);
    const court = new Court();
    court.nome = place.name;
    court.descricao = this.buildDescription(place);
    court.localizacao = place.formatted_address || place.vicinity;
    court.precoPorHora = estimatedPrice;
    court.ativa = true;
    court.googlePlaceId = place.place_id;
    court.latitude = place.geometry.location.lat;
    court.longitude = place.geometry.location.lng;
    court.googleRating = place.rating;
    court.isFromGoogle = true;
    return court;
  }

  private estimatePrice(place: any): number {
    if (place.price_level) {
      const priceMap = { 1: 45, 2: 65, 3: 85, 4: 110, 5: 150 };
      return priceMap[place.price_level] || 75;
    }
    if (place.rating) {
      if (place.rating >= 4.5) return 95;
      if (place.rating >= 4.0) return 80;
      if (place.rating >= 3.5) return 65;
      return 50;
    }
    return 75;
  }

  private buildDescription(place: any): string {
    const parts: string[] = [];
    if (place.rating) {
      parts.push(`⭐ ${place.rating.toFixed(1)}`);
    }
    if (place.user_ratings_total) {
      parts.push(`(${place.user_ratings_total} avaliações)`);
    }
    if (place.opening_hours?.open_now !== undefined) {
      parts.push(place.opening_hours.open_now ? '🟢 Aberto agora' : '🔴 Fechado');
    }
    return parts.length > 0 ? parts.join(' • ') : 'Quadra esportiva encontrada no Google';
  }
}

