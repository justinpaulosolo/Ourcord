import { Module } from '@nestjs/common';
import { AuthenticationController } from '../authentication/controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
