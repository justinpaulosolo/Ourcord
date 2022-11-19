import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { RegisterDto } from '../models/register.dto';
import { LocalAuthGuard } from '../utils/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() userData: RegisterDto) {
    return this.userService.create(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return req.user;
  }
}
