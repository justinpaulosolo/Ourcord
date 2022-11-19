import { IsEmail, Max, Min } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Min(6)
  @Max(20)
  password: string;
}
