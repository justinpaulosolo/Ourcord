import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { RegisterDto } from 'src/authentication/models/register.dto';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { exclude } from 'src/authentication/utils/exclude';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<Partial<User> | null> {
    const user = this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`No user found`);
    }
    return user;
  }

  async create(registrationData: RegisterDto) {
    const hashpassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email: registrationData.email,
          password: hashpassword,
          lastName: registrationData.lastName,
          firstName: registrationData.firstName,
        },
      });
      const userWithoutPassowrd = exclude(createdUser, 'password');
      return userWithoutPassowrd;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, data: RegisterDto): Promise<User> {
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
