import {
  Controller,
  Logger,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserBodyDTO } from './user-body.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAllUsers() {
    try {
      const users = await this.usersService.findAll();

      return users;
    } catch (error) {
      // Will log the error & automatically send the error as response with all required data
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  @Get('/:userId')
  async getUserById(@Param('userId') id: string) {
    try {
      const user = await this.usersService.findById(id);

      if (!user) {
        throw new NotFoundException('User is not found');
      }

      return user;
    } catch (error) {
      // Will log the error & automatically send the error as response with all required data
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  @Post()
  async createUser(@Body() body: UserBodyDTO) {
    try {
      const user = await this.usersService.create(body);

      return user;
    } catch (error) {
      // Will log the error & automatically send the error as response with all required data
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }
}
