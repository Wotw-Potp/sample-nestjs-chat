import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async hello() {
    return await this.userService.hello();
  }

  @Post('/register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }
}
