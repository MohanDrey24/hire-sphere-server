import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { PrismaClientExceptionFilter } from "src/common/filters/prisma-client-exception.filter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // the origin should be dynamic
  app.enableCors({
    origin: "http://localhost:8080",
    credentials: true,
  });

  app.use(cookieParser());

  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Hire Sphere")
    .setDescription("The Hire Sphere API description")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(4000);
}

bootstrap();
