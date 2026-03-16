import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface Place {
  fsq_id: string;
  name: string;
  location: {
    address?: string;
    cross_street?: string;
    formatted_address?: string;
    locality?: string;
    region?: string;
  };
  categories: Array<{ name: string }>;
  distance?: number;
}

@Injectable()
export class PlacesService {
  private readonly logger = new Logger(PlacesService.name);
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('FOURSQUARE_API_KEY');
  }

  async searchNearby(lat: number, lon: number, query?: string): Promise<Place[]> {
    if (!this.apiKey || this.apiKey === 'your-foursquare-api-key-here') {
      this.logger.warn('Foursquare API key missing or placeholder. Returning mock data.');
      return this.getMockPlaces();
    }

    try {
      // In a real implementation, we would use fetch or axios to call Foursquare API
      // For now, we provide the structure and return mock data if the key is default
      return this.getMockPlaces();
    } catch (error) {
      this.logger.error('Error fetching places from Foursquare', error.stack);
      return this.getMockPlaces();
    }
  }

  private getMockPlaces(): Place[] {
    return [
      {
        fsq_id: 'mock-1',
        name: 'Blue Bottle Coffee',
        location: {
          address: '123 Market St',
          formatted_address: '123 Market St, San Francisco, CA',
          locality: 'San Francisco',
        },
        categories: [{ name: 'Coffee Shop' }],
        distance: 150,
      },
      {
        fsq_id: 'mock-2',
        name: 'Whole Foods Market',
        location: {
          address: '200 4th St',
          formatted_address: '200 4th St, San Francisco, CA',
          locality: 'San Francisco',
        },
        categories: [{ name: 'Grocery Store' }],
        distance: 450,
      },
      {
        fsq_id: 'mock-3',
        name: 'The Italian Place',
        location: {
          address: '456 Broadway',
          formatted_address: '456 Broadway, San Francisco, CA',
          locality: 'San Francisco',
        },
        categories: [{ name: 'Italian Restaurant' }],
        distance: 800,
      }
    ];
  }
}
