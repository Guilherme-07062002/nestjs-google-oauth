import { Controller, Post, Body, UseGuards, Get, Request, Delete, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthService } from './jwt-auth.service';

@Controller('jwt-auth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}
  
  @Post('login')
  async login(@Body() loginDto: { userId: number }) {
    return this.jwtAuthService.login(loginDto.userId);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshDto: { refreshToken: string }) {
    return this.jwtAuthService.refreshAccessToken(refreshDto.refreshToken);
  }

  @Post('verify')
  async verifyToken(@Body() verifyDto: { token: string }) {
    const payload = await this.jwtAuthService.verifyToken(verifyDto.token);
    return { valid: true, payload };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Request() req) {
    return this.jwtAuthService.logout(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('revoke')
  async revokeToken(@Request() req, @Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    // Implementar revogação de token específico
    return this.jwtAuthService.logout(req.user.sub);
  }

  @Post('validate-user')
  async validateUser(@Body() validateDto: { userId: number }) {
    return this.jwtAuthService.validateUser(validateDto.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser(@Request() req) {
    const userInfo = await this.jwtAuthService.validateUser(req.user.sub);
    return userInfo;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
