import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../../utils/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.update({
      data: data,
      where: { id },
    });
  }

  async delete(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
