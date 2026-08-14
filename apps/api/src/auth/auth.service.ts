import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as argon2 from "argon2"

type AuthInput = {username: string; password: string}
type SignInData = {userId: string; username: string}
type AuthResult = {accessToken: string; userId: string; username: string}

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findUserByName(input.username);

        const isValid = await argon2.verify(
            user.passwordHash,
            input.password
        )

        if (isValid) {
            return {
                userId: user.id,
                username: user.username
            }
        }

        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return {accessToken: accessToken, username: user.username, userId: user.userId};
    }

    async authentificate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user);
    }
}
