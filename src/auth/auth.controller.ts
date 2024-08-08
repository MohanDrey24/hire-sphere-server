import {
  Controller,
  Post,
  Body,
  UsePipes,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { usersSchema, CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ZodValidationPipe } from 'common/filters/zod-validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UsePipes(new ZodValidationPipe(usersSchema))
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post()
  async signUp(@Body() data: CreateUserDTO): Promise<User> {
    return await this.usersService.createUser(data);
  }

  @Post('signin')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async signIn(@Body() data: CreateUserDTO): Promise<Record<string, string>> {
    return await this.usersService.signIn(data);
  }
}
