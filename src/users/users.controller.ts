import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserQuery } from './interfaces/users.interfaces';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUser(
    @Query('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserQuery> {
    return await this.usersService.findUser({ userId });
  }

  @Delete(':userId')
  @HttpCode(204)
  async deletUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.usersService.deleteUser({ userId });
  }
}
