import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    validateUser: jest.fn(() =>
      Promise.resolve({ id: 1, email: 'test@example.com', role: 'admin' }),
    ),
    login: jest.fn(() => Promise.resolve({ access_token: 'mockToken' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return a JWT token on login', async () => {
    const result = await authController.login({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual({ access_token: 'mockToken' });
  });
});
