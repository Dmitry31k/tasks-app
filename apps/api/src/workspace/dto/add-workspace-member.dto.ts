import { Role } from "generated/prisma/enums";

export class AddWorkspaceMemberDto {
    username!: string;
    userRole!: Role;
    workspaceId!: string;
}