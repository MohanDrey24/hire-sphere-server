import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from 'src/users/local.strategy';
@Module({
  providers: [UsersService, PrismaService, LocalStrategy],
})
export class UsersModule {}
