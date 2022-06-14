import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const existedUser = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (existedUser) {
      throw new ConflictException('Username has been duplicated');
    }

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      username,
      password: hashedPass,
    });

    await this.usersRepository.save(user);
  }
}
