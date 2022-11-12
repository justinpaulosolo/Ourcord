import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a user', async () => {
    const testUser = {
      id: 1,
      email: 'test@test.com',
      password: 'Password123',
    };
    prisma.user.create.mockResolvedValue(testUser);

    await expect(service.create(testUser)).resolves.toEqual({
      id: 1,
      email: 'test@test.com',
      password: 'Password123',
    });
  });

  it('updates a user', async () => {
    const params = {
      id: 1,
      data: {
        id: 1,
        email: 'test@test.com',
        password: 'Password123',
      },
    };

    prisma.user.update.mockResolvedValue(params.data);

    await expect(service.update(params.id, params.data)).resolves.toEqual({
      id: 1,
      email: 'test@test.com',
      password: 'Password123',
    });
  });

  it('returns users', () => {
    const testUsers = [
      {
        id: 1,
        email: 'test@test.com',
        password: 'Password123',
      },
      {
        id: 2,
        email: 'test2@test.com',
        password: 'Password123',
      },
    ];

    prisma.user.findMany.mockResolvedValue(testUsers);

    expect(service.users()).resolves.toBe(testUsers);
  });

  it('returns a user', () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      password: 'Password123',
    };

    prisma.user.findUnique.mockResolvedValue(user);

    expect(service.user(1)).resolves.toBe(user);
  });
});
