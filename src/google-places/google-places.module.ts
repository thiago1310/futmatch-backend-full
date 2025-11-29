import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GooglePlacesService } from './google-places.service';
import { GooglePlacesController } from './google-places.controller';
import { CourtsModule } from '../courts/courts.module';

@Module({
  imports: [HttpModule, CourtsModule],
  controllers: [GooglePlacesController],
  providers: [GooglePlacesService],
  exports: [GooglePlacesService],
})
export class GooglePlacesModule {}

