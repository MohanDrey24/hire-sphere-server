import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';
import { CreateCompanyDTO, createCompanySchema, } from './dto/create-company.dto';
import { ZodValidationPipe } from 'src/common/filters/zod-validation.pipe';
// import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createCompanySchema)) data: CreateCompanyDTO,
  ): Promise<Company> {
    return this.companyService.create(data);
  }

  @Get()
  async find(@Query('id', ParseUUIDPipe) id: string): Promise<Company> {
    return this.companyService.find({ id });
  }
}
