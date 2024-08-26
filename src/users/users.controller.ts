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

// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUser(@Query('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.findUser({ id });
  }

  @Delete(':id')
  @HttpCode(204)
  async deletUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.deleteUser({ id });
  }
}
