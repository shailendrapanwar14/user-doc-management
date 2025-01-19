import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
      }),
    };

    const mockJwtService = {
      sign: jest.fn(() => 'mockToken'),
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('mockHashedPassword');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should validate user successfully', async () => {
    const user = await authService.validateUser('test@example.com', 'password123');
    expect(user).toEqual({ id: 1, email: 'test@example.com', role: 'admin' });
  });

  it('should return null for invalid user credentials', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

    const user = await authService.validateUser('wrong@example.com', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('should return a JWT token on login', async () => {
    const mockUser = { id: 1, email: 'test@example.com', role: 'admin' };
    const token = await authService.login(mockUser);
    expect(token).toEqual({ access_token: 'mockToken' });
  });
});
