import { Controller, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { usersSchema, CreateUserDTO } from 'src/users/dto/users.dto';
import { ZodValidationPipe } from 'common/filters/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(usersSchema))
  async signUp(@Body() data: CreateUserDTO): Promise<User> {
    return await this.usersService.createUser(data);
  }

  @Post('signin')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(usersSchema))
  async signIn(@Body() data: CreateUserDTO): Promise<void> {
    return await this.usersService.signIn(data);
  }
}
