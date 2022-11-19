import { IsEmail, IsNotEmpty, Min, Max, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @Min(6)
  @Max(20)
  @IsNotEmpty()
  password: string;
}
