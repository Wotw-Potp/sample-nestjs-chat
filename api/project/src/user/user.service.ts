import { Injectable } from '@nestjs/common';
import { RegisterUserDto, User } from './user.dto';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { User as UserEntity } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async hello() {
    return await this.userRepository.find();
  }

  async register(registerUser: RegisterUserDto): Promise<User> {
    return await this.findOrInsert(registerUser.name);
  }

  async findOrInsert(name: User['name']): Promise<User> {
    const user = await this.userRepository.findOneBy({ name: name });
    if (user) return user;
    const newUser: User = {
      uid: randomBytes(16).toString('hex'),
      name: name,
    };
    await this.userRepository.insert(newUser);
    return newUser;
  }
}
