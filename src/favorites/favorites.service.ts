import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Favorite } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async toggle(data: Prisma.FavoriteCreateInput): Promise<Favorite> {
    const isRecordExist = await this.prismaService.favorite.findFirst({
      where: { userId: data.user.connect?.id, jobId: data.job.connect?.id }
    })

    if (isRecordExist) {
      return await this.prismaService.favorite.delete({ 
        where: { id: isRecordExist.id }
      });
    } else {
      return await this.prismaService.favorite.create({ data });
    }
  }

  async remove(where: Prisma.FavoriteWhereUniqueInput): Promise<void> {
    await this.prismaService.favorite.delete({ where });
  }

  async getAllFavorites(where: Prisma.FavoriteWhereInput): Promise<Favorite[]> {
    return this.prismaService.favorite.findMany({ where });
  }
}
