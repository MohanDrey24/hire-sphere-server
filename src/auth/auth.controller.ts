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
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { usersSchema, CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ZodValidationPipe } from 'src/common/filters/zod-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { SignInDTO, signInSchema } from 'src/users/dto/sign-in.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async signUp(
    @Body(new ZodValidationPipe(usersSchema)) data: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const token = await this.authService.createUser(data);

      res.cookie('HS', token, { httpOnly: true, sameSite: 'lax' })
      res.status(HttpStatus.OK).json({ message: 'Sign up successful. Logging in immediately' });
    } catch (e) {
      throw new InternalServerErrorException(`Unsuccessful sign up. ${e}`)
    }
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signIn(
    @Body(new ZodValidationPipe(signInSchema)) data: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    try {
      const token = await this.authService.signIn(data);

      res.cookie('HS', token, { httpOnly: true, sameSite: 'lax' });
      res.status(HttpStatus.OK).json({ message: 'Log in successful' });
    } catch (error) {
      throw new NotFoundException(`Log in unsuccessful ${error}`);
    }
  }

  @Post('signout')
  async signout(@Res({ passthrough: true }) res: Response): Promise<void> {
    res.cookie('HS', '', { expires: new Date() });
    res.status(HttpStatus.OK).json({ mesage: 'Successful logout'});
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request): Promise<Request> {
    return req;
  }

  /**
   * DONT FORGET TO CHANGE THE REDIRECT URI IN
   * https://console.cloud.google.com/apis/credentials?project=hire-sphere-432601
   */
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const userProfile = req.user as User

    if (userProfile) {
      const token = this.jwtService.sign({ id: userProfile.id })
      res.cookie('HS', token, { httpOnly: true });
      res.redirect('http://localhost:3000/dashboard')
    } else {
      res.redirect('http://localhost:3000?error=authentication_failed')
    }
  }
}
