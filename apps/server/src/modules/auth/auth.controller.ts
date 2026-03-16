import { Controller, Post, Body, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse } from '@justsplitapp/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('magic-link')
  async requestMagicLink(@Body() loginDto: LoginDto) {
    if (!loginDto.email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    return this.authService.login(loginDto.email);
  }

  @Get('verify')
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
