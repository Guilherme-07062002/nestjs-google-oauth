import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    async googleLogin() {
      console.log('Google login initiated');
    }
    
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback() {
      console.log('Google callback received');
      
    }
}