import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { Place } from '@justsplitapp/types';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('nearby')
  @ApiOperation({ summary: 'Search for nearby places' })
  @ApiQuery({ name: 'lat', required: true, example: '37.7749' })
  @ApiQuery({ name: 'lon', required: true, example: '-122.4194' })
  @ApiQuery({ name: 'query', required: false })
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
