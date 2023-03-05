import { IsAlphanumeric, IsString, Length } from 'class-validator';

export type User = {
  id?: number;
  uid: string;
  name: string;
};

export class RegisterUserDto {
  @IsString()
  @Length(3, 20)
  @IsAlphanumeric()
  name: User['name'];
}
