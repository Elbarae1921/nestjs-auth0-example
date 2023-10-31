import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('auth/auth0/callback')
  @UseGuards(AuthGuard('auth0'))
  async callback(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('auth/auth0/login')
  @UseGuards(AuthGuard('auth0'))
  async auth0Login() {
    // The Auth0Guard will redirect the user to Auth0 for login.
    // This function will not be called unless there is an error.
  }
}
