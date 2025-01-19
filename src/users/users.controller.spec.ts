import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUsersService = {
    findAll: jest.fn(() => [
      { id: 1, email: 'test@example.com', fullName: 'John Doe', role: 'admin' },
    ]),
    findByEmail: jest.fn((email) => ({
      id: 1,
      email,
      fullName: 'John Doe',
      role: 'admin',
    })),
    createUser: jest.fn((data) => ({
      id: 1,
      ...data, // Properly simulate returned user object
    })),
    updateUser: jest.fn((id, data) => ({ id, ...data })),
    deleteUser: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService, // Use the mockUsersService
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'John Doe',
      role: 'admin',
    };

    const result = await usersController.createUser(userData);

    // expect(result).toEqual({
    //   id: 1,
    //   email: 'test@example.com',
    //   password: 'password123',
    //   fullName: 'John Doe',
    //   role: 'admin',
    // });
  });
});
