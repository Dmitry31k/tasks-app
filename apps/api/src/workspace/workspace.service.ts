import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseCreateTaskManagerDto } from './dto/base-task-manager.dto';

@Injectable()
export class WorkspaceService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(dto: BaseCreateTaskManagerDto, userId: string) {
        return await this.prismaService.workspace.create({
            data: {
                workspaceName: dto.name,
                userId: userId
            }
        })
    }

    async getAllWorkspaces(userId: string) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: {
                id: userId
            },
            include: {
                ownedWorkspaces: {
                    include: {
                        boards: {
                            include: {
                                tasks: true
                            }
                        }
                    }
                }
            }
        });

        return user.ownedWorkspaces;
    }

    async getWorkspaceById(userId: string, workspaceId: string) {
        return await this.prismaService.workspace.findFirstOrThrow({
            where: {
                id: workspaceId,
                userId: userId
            }
        })
    }
}
