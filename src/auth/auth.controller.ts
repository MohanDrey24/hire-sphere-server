import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { usersSchema, CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ZodValidationPipe } from 'common/filters/zod-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { SignInDTO, signInSchema } from 'src/users/dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post()
  async signUp(
    @Body(new ZodValidationPipe(usersSchema)) data: CreateUserDTO,
  ): Promise<User> {
    return await this.usersService.createUser(data);
  }

  @Post('signin')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async signIn(
    @Body(new ZodValidationPipe(signInSchema)) data: SignInDTO,
  ): Promise<Record<string, string>> {
    return await this.usersService.signIn(data);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any): Promise<any> {
    //TO DO
    return req;
  }

  /**
   * DONT FORGET TO CHANGE THE REDIRECT URI IN
   * https://console.cloud.google.com/apis/credentials?project=hire-sphere-432601
   */
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any): Promise<Record<string, string>> {
    return {
      message: `User Information from ${req.user.provider}`,
      user: req.user._json,
    };
  }
}
