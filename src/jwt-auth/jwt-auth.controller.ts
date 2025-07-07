import { Controller, Post } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';

@Controller('jwt-auth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}
  
  @Post('login')
  async login() {
    // Implementar lógica de login com JWT
    return this.jwtAuthService.login();
  }
}
