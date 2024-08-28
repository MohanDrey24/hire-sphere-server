import { Module } from '@nestjs/common';
import { JobModule } from './jobs/job.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    JobModule, 
    AuthModule, 
    UsersModule, 
    CompanyModule, 
    FavoritesModule,
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 3,
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ]
})
export class AppModule {}
