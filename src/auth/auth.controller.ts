import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() user: { userName: string; password: string }) {
      const tokenObj =  await this.authService.login(user)
      return tokenObj;
  }
}