import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from "argon2"

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findUserByName(username: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                username: username,
            }
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async createUser(dto: CreateUserDto) {
        const passwordHash = await argon2.hash(dto.password);

        return await this.prismaService.user.create({
            data: {
                username: dto.username,
                passwordHash: passwordHash
            }
        });
    }
}
