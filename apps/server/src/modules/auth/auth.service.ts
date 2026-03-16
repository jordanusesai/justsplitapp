import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, AuthResponse } from '@justsplitapp/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  async login(email: string): Promise<{ message: string }> {
    this.logger.log(`Magic link requested for: ${email}`);
    // In a real app, this would generate a one-time token and send an email
    // For this scaffold, we'll assume the email is sent successfully
    return { message: 'Magic link sent to your email' };
  }

  async verifyMagicLink(token: string): Promise<AuthResponse> {
    this.logger.log(`Verifying magic link token`);
    
    // Mock user for the scaffold
    const mockUser: User = {
      id: 'mock-user-id',
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const jwt = this.jwtService.sign({ sub: mockUser.id, email: mockUser.email });

    return {
      user: mockUser,
      token: jwt,
    };
  }

  async validateUser(payload: any): Promise<User | null> {
    // This would normally check the database
    return {
      id: payload.sub,
      email: payload.email,
      name: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
