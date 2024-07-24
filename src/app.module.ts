import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule} from './jobs/job.module';

@Module({
  imports: [JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
