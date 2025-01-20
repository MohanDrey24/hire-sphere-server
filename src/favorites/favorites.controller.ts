import { 
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ZodValidationPipe } from 'src/common/filters/zod-validation.pipe';
import { AddFavoriteSchema, AddFavoriteDTO } from './dto/add-favorite.dto';
import { Favorite } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from 'src/common/types/user-request';

@UseGuards(AuthGuard('jwt'))
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(
    @Body(new ZodValidationPipe(AddFavoriteSchema)) data: AddFavoriteDTO,
    @Req() req: UserRequest, 
  ): Promise<Favorite> {

    const payload = {
      user: {
        connect: {
          id: req.user.id
        }
      },
      job: {
        connect: {
          id: data.jobId
        }
      }
    }

    return await this.favoritesService.add(payload);
  };

  @Get()
  async getAll(): Promise<Favorite[]> {
    return await this.favoritesService.getAllFavorites();
  }

  @Delete(':id')
  @HttpCode(204)
  async removeFavorite(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.remove({ id })
  }
}
