import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    const user = await this.usersService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
