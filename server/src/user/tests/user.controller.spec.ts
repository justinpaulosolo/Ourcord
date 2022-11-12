import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from '../models/create-user.dto';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            users: jest.fn().mockResolvedValue([
              {
                id: 1,
                email: 'test1@test.com',
                password: 'Password1',
              },
              {
                id: 2,
                email: 'test2@test.com',
                password: 'Password2',
              },
            ]),
            user: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                id,
                email: 'test1@test.com',
                password: 'Password1',
              }),
            ),
            create: jest.fn().mockImplementation((user: CreateUser) =>
              Promise.resolve({
                id: 3,
                ...user,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, user: CreateUser) =>
                Promise.resolve({
                  id,
                  ...user,
                }),
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should be an array of users', async () => {
      await expect(controller.getUsers()).resolves.toEqual([
        {
          id: 1,
          email: 'test1@test.com',
          password: 'Password1',
        },
        {
          id: 2,
          email: 'test2@test.com',
          password: 'Password2',
        },
      ]);
    });
  });

  describe('getUser', () => {
    it('should be a user', async () => {
      await expect(controller.getUser(1)).resolves.toEqual({
        id: 1,
        email: 'test1@test.com',
        password: 'Password1',
      });
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const newUser: CreateUser = {
        email: 'test@test.com',
        password: 'Password1',
      };
      await expect(controller.createUser(newUser)).resolves.toEqual({
        id: 3,
        ...newUser,
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUser: CreateUser = {
        email: 'test@test.com',
        password: 'Password1',
      };
      await expect(controller.updateUser(1, updateUser)).resolves.toEqual({
        id: 1,
        ...updateUser,
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      await expect(controller.deleteUser(1)).resolves.toEqual({
        deleted: true,
      });
    });

    it('should throw an error if the user does not exist', async () => {
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockResolvedValue({ deleted: false });
      await expect(controller.deleteUser(2)).resolves.toEqual({
        deleted: false,
      });
      expect(deleteSpy).toBeCalledWith(2);
    });
  });
});
