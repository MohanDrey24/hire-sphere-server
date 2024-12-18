import { 
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ZodValidationPipe } from 'src/common/filters/zod-validation.pipe';
import { AddFavoriteSchema, AddFavoriteDTO } from './dto/add-favorite.dto';
import { Favorite } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(
    @Body(new ZodValidationPipe(AddFavoriteSchema)) data: AddFavoriteDTO 
  ): Promise<Favorite> {
    return await this.favoritesService.add(data);
  };

  @Get()
  async getAll(): Promise<Favorite[]> {
    return await this.favoritesService.getAllFavorites();
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.remove({ id })
  }
}
