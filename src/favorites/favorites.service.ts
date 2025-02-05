import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, Favorite } from "@prisma/client";
import { ToggleFavorite } from "./types/favorites";

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async toggle(data: Prisma.FavoriteCreateInput): Promise<ToggleFavorite> {
    const isRecordExist = await this.prismaService.favorite.findFirst({
      where: { userId: data.user.connect?.id, jobId: data.job.connect?.id },
    });

    if (isRecordExist) {
      const result = await this.prismaService.favorite.delete({
        where: { id: isRecordExist.id },
      });

      return {
        message: `Job Id: ${result.jobId} has successfully been unfavorited`,
      };
    }

    const result = await this.prismaService.favorite.create({ data });
    return {
      message: `Job Id: ${result.jobId} has successfully been favorited`,
    };
  }

  async remove(where: Prisma.FavoriteWhereUniqueInput): Promise<void> {
    await this.prismaService.favorite.delete({ where });
  }

  async getAllFavorites(where: Prisma.FavoriteWhereInput): Promise<Favorite[]> {
    return this.prismaService.favorite.findMany({ where });
  }
}
