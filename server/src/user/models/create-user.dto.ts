import { IsEmail, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Min(6)
  @Max(20)
  @IsNotEmpty()
  password: string;
}
