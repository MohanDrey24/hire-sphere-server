import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

// I DONT KNOW IF IT WORKS
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string }): Promise<{ id: string }> {
    return {
      id: payload.id,
    };
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'HS' in req.cookies) {
      return req.cookies.HS;
    }

    return null;
  }
}
