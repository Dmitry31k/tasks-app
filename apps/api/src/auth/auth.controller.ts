import { Body, Controller, Get, NotImplementedException, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() input: {username: string, password: string}) {
    return this.authService.authentificate(input);
  }

  @UseGuards(AuthGuard)
  @Get("me")
  getUserInfo() {
    throw new NotImplementedException();
  }
}
