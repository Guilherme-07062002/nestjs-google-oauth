import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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
    async googleCallback(@Req() req: any, @Res() res: any) {
      console.log('Google callback received');
      res.redirect('http://localhost:3000'); // Redireciona para a página inicial ou outra rota após o login
    }
}