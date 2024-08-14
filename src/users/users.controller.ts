import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserQuery } from './interfaces/users.interfaces';
// import { AuthGuard } from '@nestjs/passport';

@Controller('users')
//@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUser(@Query('id', ParseUUIDPipe) id: string): Promise<UserQuery> {
    return await this.usersService.findUser({ id });
  }

  @Delete(':id')
  @HttpCode(204)
  async deletUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.deleteUser({ id });
  }
}
