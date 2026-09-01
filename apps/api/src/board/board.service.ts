import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
    constructor(private readonly prismaService: PrismaService) {}

    async createBoard(dto: CreateBoardDto, userId: string) {
        await this.prismaService.workspace.findFirstOrThrow({
            where: {
                userId: userId,
                id: dto.workspaceId
            }
        })

        return await this.prismaService.board.create({
            data: {
                boardName: dto.boardName,
                workspaceId: dto.workspaceId
            }
        })
    }
}
