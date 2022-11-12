import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { RegisterDto } from '../models/register.dto';
import { exclude } from '../utils/exclude';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private prisma: PrismaService) {}

  async register(registrationData: RegisterDto) {
    const hashpassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email: registrationData.email,
          password: hashpassword,
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
}
