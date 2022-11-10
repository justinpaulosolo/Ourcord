import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  testt() {
    return 'Hello World!';
  }
}
