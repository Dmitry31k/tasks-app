import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { BaseCreateTaskManagerDto } from './dto/base-task-manager.dto';
import { PassportJwtGuard } from 'src/auth/guards/passport-jwt.guard';
import { AddWorkspaceMemberDto, RemoveWorkspaceMemberDto } from './dto/workspace-member.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(PassportJwtGuard)
  @Post()
  create(@Request() request, @Body() dto: BaseCreateTaskManagerDto) {
    return this.workspaceService.create(dto, request.user.userId);
  }

  @UseGuards(PassportJwtGuard)
  @Get("all")
  getAllWorkspaces(@Request() request) {
    return this.workspaceService.getAllWorkspaces(request.user.userId)
  }

  @UseGuards(PassportJwtGuard)
  @Get("by-id/:id")
  getWorkspaceById(@Param("id") id: string, @Request() request) {
    return this.workspaceService.getWorkspaceById(request.user.userId, id);
  }

  @UseGuards(PassportJwtGuard)
  @Delete("by-id/:id")
  deleteWorkspace(@Param("id") id: string, @Request() request) {
    return this.workspaceService.deleteWorkspace(request.user.userId, id);
  }

  @UseGuards(PassportJwtGuard)
  @Post("member")
  addWorkspaceMember(@Request() request, @Body() dto: AddWorkspaceMemberDto) {
    return this.workspaceService.addWorkspaceMember(request.user.userId, dto);
  }

  @UseGuards(PassportJwtGuard)
  @Delete("member")
  deleteWorkspaceMember(@Request() request, @Body() dto: RemoveWorkspaceMemberDto) {
    return this.workspaceService.removeWorkspaceMember(request.user.userId, dto);
  }
}
