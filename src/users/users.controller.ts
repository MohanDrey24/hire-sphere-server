import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";
import type { UserRequest } from "src/common/types/user-request";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUser(@Query("id", ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.findUser({ id });
  }

  @Get("current")
  async getCurrentUser(@Req() req: UserRequest): Promise<User> {
    return await this.usersService.findUser({ id: req.user.id });
  }

  @Delete(":id")
  @HttpCode(204)
  async deletUser(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.deleteUser({ id });
  }
}
