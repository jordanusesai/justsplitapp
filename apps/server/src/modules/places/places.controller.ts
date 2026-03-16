import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { PlacesService, Place } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('nearby')
  async getNearby(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('query') query?: string,
  ): Promise<Place[]> {
    return this.placesService.searchNearby(
      parseFloat(lat),
      parseFloat(lon),
      query,
    );
  }
}
