import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseCreateTaskManagerDto } from './dto/base-task-manager.dto';
import { AddWorkspaceMemberDto, RemoveWorkspaceMemberDto } from './dto/workspace-member.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from 'generated/prisma/enums';
import { UserAccess } from 'generated/prisma/browser';

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
        await this.assertWorkspaceRole(workspaceId, userId, [Role.OWNER]);

        return await this.prismaService.workspace.delete({
            where: {
                id: workspaceId
            }
        });
    }

    async addWorkspaceMember(userId: string, dto: AddWorkspaceMemberDto) {
        await this.assertWorkspaceRole(dto.workspaceId, userId, [Role.OWNER]);
        const user = await this.usersService.findUserByName(dto.username);

        return await this.prismaService.userAccess.create({
            data: {
                userRole: dto.userRole,
                userId: user.id,
                workspaceId: dto.workspaceId
            }
        });
    }

    async removeWorkspaceMember(userId: string, dto: RemoveWorkspaceMemberDto) {
        await this.assertWorkspaceRole(dto.workspaceId, userId, [Role.OWNER]);
        const user = await this.usersService.findUserByName(dto.username);

        if (user.id === userId) {
            throw new BadRequestException("Owner can't remove himself from workspace");
        }

        return await this.prismaService.userAccess.delete({
            where: {
                userId_workspaceId: {
                    userId: user.id,
                    workspaceId: dto.workspaceId
                }
            }
        })
    }

    private async assertWorkspaceRole(workspaceId: string, userId: string, userRoles: Role[]): Promise<UserAccess> {
        return await this.prismaService.userAccess.findFirstOrThrow({
            where: {
                workspaceId: workspaceId,
                userId: userId,
                userRole: {
                    in: userRoles
                }
            }
        });
    }
}
