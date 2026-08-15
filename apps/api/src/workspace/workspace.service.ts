import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseCreateTaskManagerDto } from './dto/base-task-manager.dto';
import { AddWorkspaceMemberDto } from './dto/add-workspace-member.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WorkspaceService {
    constructor(private readonly prismaService: PrismaService,
        private readonly usersService: UsersService
    ) {}

    async create(dto: BaseCreateTaskManagerDto, userId: string) {
        const workspace = await this.prismaService.workspace.create({
            data: {
                workspaceName: dto.name
            }
        });
        
        await this.prismaService.userAccess.create({
            data: {
                userRole: 'OWNER',
                userId: userId,
                workspaceId: workspace.id
            }
        })

        return workspace;
    }

    async getAllWorkspaces(userId: string) {
        const accesses = await this.prismaService.userAccess.findMany({
            where: {
                userId: userId
            },
            select: {
                workspace: {
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

        return accesses.map(access => access.workspace);
    }

    async getWorkspaceById(userId: string, workspaceId: string) {
        const access = await this.prismaService.userAccess.findFirstOrThrow({
            where: {
                userId: userId,
                workspaceId: workspaceId
            },
            select: {
                workspace: {
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

        return access.workspace;
    }

    async deleteWorkspace(userId: string, workspaceId: string) {
        await this.prismaService.userAccess.findFirstOrThrow({
            where: {
                userRole: "OWNER",
                userId: userId,
                workspaceId: workspaceId
            }
        });

        return await this.prismaService.workspace.delete({
            where: {
                id: workspaceId
            }
        });
    }

    async addWorkspaceMember(userId: string, dto: AddWorkspaceMemberDto) {
        await this.prismaService.userAccess.findFirstOrThrow({
            where: {
                workspaceId: dto.workspaceId,
                userId: userId,
                userRole: "OWNER"
            }
        });

        const user = this.usersService.findUserByName(dto.username);

        return await this.prismaService.userAccess.create({
            data: {
                userRole: dto.userRole,
                userId: (await user).id,
                workspaceId: dto.workspaceId
            }
        });
    }
}
