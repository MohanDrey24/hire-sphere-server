import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './jobs/job.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [JobModule, AuthModule, UsersModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
