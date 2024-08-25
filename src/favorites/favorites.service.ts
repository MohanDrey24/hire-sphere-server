import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Favorite } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async add(data: Prisma.FavoriteCreateInput): Promise<Favorite> {
    return await this.prismaService.favorite.create({ data });
  }

  async remove(where: Prisma.FavoriteWhereUniqueInput): Promise<void> {
    await this.prismaService.favorite.delete({ where });
  }

  async getAllFavorites(): Promise<Favorite[]> {
    return this.prismaService.favorite.findMany();
  }
}
