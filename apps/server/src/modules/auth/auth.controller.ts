import { Controller, Post, Body, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse } from '@justsplitapp/types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('magic-link')
  @ApiOperation({ summary: 'Request a magic link for login' })
  @ApiResponse({ status: 200, description: 'Magic link sent successfully' })
  async requestMagicLink(@Body() loginDto: LoginDto) {
    if (!loginDto.email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    return this.authService.login(loginDto.email);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify a magic link token' })
  @ApiQuery({ name: 'token', required: true })
  @ApiResponse({ status: 200, description: 'Token verified successfully' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
  async verifyMagicLink(@Query('token') token: string): Promise<AuthResponse> {
    if (!token) {
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.authService.verifyMagicLink(token);
    } catch (error) {
      throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
    }
  }
}
