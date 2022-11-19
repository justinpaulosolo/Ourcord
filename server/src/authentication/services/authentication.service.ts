import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../models/register.dto';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}

  async register(signUp: RegisterDto) {
    return await this.userService.create(signUp);
  }

  async login(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    if (!(await this.checkPassword(pass, user.password as string))) {
      throw new UnauthorizedException('Wrong password');
    }

    delete user.password;

    return user;
  }

  async checkPassword(password: string, hashPass: string) {
    return bcrypt.compare(password, hashPass);
  }
}
