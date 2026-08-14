import { CanActivate, ExecutionContext, UnauthorizedException, } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class AuthGuard implements CanActivate {
    constructor(private jwtServise: JwtService) {};

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(" ")[1];

        if (!token || !authorization || !authorization.startsWith("Bearer ")) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayload = await this.jwtServise.verifyAsync(token);
            request.user = {
                userId: tokenPayload.sub,
                username: tokenPayload.username
            }
            return true;
        }
        catch (error) {
            throw new UnauthorizedException();
        }
    }
}