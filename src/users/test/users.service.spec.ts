import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let usersService: UsersService;

  // Mock repository methods
  const mockUserRepository = {
    create: jest.fn((dto) => dto), // Mock create method
    save: jest.fn((user) => Promise.resolve({ id: 1, ...user })), // Mock save method
    findOne: jest.fn(), // Mock findOne method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository, // Provide mock repository
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should hash password and create a user', async () => {
    // Mock bcrypt hash method
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

    const result = await usersService.createUser(
      'test@example.com',
      'password123',
      'John Doe',
      'admin',
    );

    expect(mockUserRepository.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'hashedPassword',
      fullName: 'John Doe',
      role: 'admin',
    });
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      fullName: 'John Doe',
      role: 'admin',
    });
  });
});
