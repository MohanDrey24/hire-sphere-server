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
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';

@Controller('users')
//@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUser(@Query('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.findUser({ id });
  }

  @Delete(':id')
  @HttpCode(204)
  deletUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.deleteUser({ id });
  }
}
