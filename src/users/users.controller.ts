import { Controller, Get, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserQuery } from './interfaces/users.interfaces';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUser(
    @Query('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserQuery> {
    return await this.usersService.findUser({ id });
  }
}
