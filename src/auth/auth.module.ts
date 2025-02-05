import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/users/local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    PrismaService,
    GoogleStrategy,
    LocalStrategy,
    JwtStrategy,
    AuthService,
  ],
})
export class AuthModule {}
