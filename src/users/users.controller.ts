import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";
import type { UserRequest } from "src/common/types/user-request";
import { ZodValidationPipe } from "src/common/filters/zod-validation.pipe";
import { UpdateUserDTO, UpdateUserSchema } from "./dto/update-user.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUser(@Query("id", ParseUUIDPipe) id: string): Promise<User | null> {
    return await this.usersService.findUser({ id });
  }

  @Get("current")
  async getCurrentUser(@Req() req: UserRequest): Promise<User | null> {
    return await this.usersService.findUser({ id: req.user.id });
  }

  @Put()
  async updateUser(
    @Req() req: UserRequest,
    @Body(new ZodValidationPipe(UpdateUserSchema)) data: UpdateUserDTO
  ) {
    return await this.usersService.updateUser(req.user.id, data);
  }

  @Delete(":id")
  @HttpCode(204)
  async deletUser(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.deleteUser({ id });
  }
}
