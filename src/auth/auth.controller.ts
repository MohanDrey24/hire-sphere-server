import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { usersSchema, CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ZodValidationPipe } from 'common/filters/zod-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { SignInDTO, signInSchema } from 'src/users/dto/sign-in.dto';
import { Request, Response } from 'express';

interface GoogleUser {
  provider: string;
  _json: any;
}

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
  @UseGuards(AuthGuard('local'))
  async signIn(
    @Body(new ZodValidationPipe(signInSchema)) data: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Record<string, string>> {
    try {
      const token = await this.usersService.signIn(data);

      res.cookie('HS', token, { httpOnly: true });
      res.status(HttpStatus.OK);

      return { message: 'Log in successful' };
    } catch (error) {
      throw new NotFoundException('Log in unsuccessful');
    }
  }

  @Post('signout')
  async signout(@Res({ passthrough: true }) res: Response): Promise<void> {
    res.cookie('HS', '', { expires: new Date() });
    res.status(HttpStatus.OK);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request): Promise<Request> {
    //TO DO
    return req;
  }

  /**
   * DONT FORGET TO CHANGE THE REDIRECT URI IN
   * https://console.cloud.google.com/apis/credentials?project=hire-sphere-432601
   */
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request): Promise<Record<string, any>> {
    const user = req.user as GoogleUser;

    if (user) {
      return {
        message: `User Information from ${user.provider}`,
        user: user._json,
      };
    } else {
      throw new Error('User information not available');
    }
  }
}
