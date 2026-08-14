import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { PassportJwtGuard } from "./guards/passport-jwt.guard";

@Controller("passport-auth")
export class PassportAuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(PassportLocalGuard)
    @Post("login")
    login(@Request() request) {
        return this.authService.signIn(request.user)
    }

    @UseGuards(PassportJwtGuard)
    @Get("me")
    getUserInfo(@Request() request) {
        return request.user;
    }
}