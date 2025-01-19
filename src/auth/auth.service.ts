import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Ensure it's injected
    private readonly jwtService: JwtService,
  ) {}

  // Method to validate a user's credentials
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // Fetch user from UsersService
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude the password field
      return result;
    }
    return null; // Invalid credentials
  }

  // Method to generate a JWT token for the user
   async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.email, sub: user.id, roles: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  } 
  private tokenBlacklist = new Set<string>(); // Simple in-memory token blacklist

  logout(token: string) {
    this.tokenBlacklist.add(token);
    return { message: 'Logged out successfully' };
  }

  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.has(token);
  }
}
