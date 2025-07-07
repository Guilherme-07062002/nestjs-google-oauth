import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../google-auth/guards/google-auth.guard';
import { GoogleAuthService } from 'src/google-auth/google-auth.service';

@Controller('google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}
    
    @UseGuards(GoogleAuthGuard)
    @Get('login')
    async googleLogin() {
      console.log('Google login initiated');
    }
    
    @UseGuards(GoogleAuthGuard)
    @Get('callback')
    async googleCallback(@Req() req: any, @Res() res: any) {
      console.log('Google callback received');
      res.redirect('http://localhost:3000'); // Redireciona para a página inicial ou outra rota após o login
    }
}