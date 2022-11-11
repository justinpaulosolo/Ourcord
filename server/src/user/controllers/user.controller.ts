import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users();
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<UserModel | null> {
    return this.userService.user(id);
  }

  @Post('/')
  async createUser(
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.create(userData);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: { email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.update(id, userData);
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id') id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.userService.delete(id);
  }
}
