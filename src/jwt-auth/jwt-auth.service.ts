import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt-auth.config';
import { AuthJwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class JwtAuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}

    async login(userId: number) {
        // Usar generateTokens ao invés de gerar apenas accessToken
        return this.generateTokens(userId);
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: this.jwtConfiguration.accessTokenTtl,
                secret: this.jwtConfiguration.secret,
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: this.jwtConfiguration.refreshTokenTtl,
                secret: this.jwtConfiguration.secret,
            })
        ]);
        
        return { accessToken, refreshToken };
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync<AuthJwtPayload>(
                refreshToken,
                {
                    secret: this.jwtConfiguration.secret,
                }
            );
            
            const newAccessToken = await this.jwtService.signAsync(
                { sub: payload.sub },
                { 
                    expiresIn: this.jwtConfiguration.accessTokenTtl,
                    secret: this.jwtConfiguration.secret,
                }
            );
            
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Token de refresh inválido');
        }
    }

    async verifyToken(token: string): Promise<AuthJwtPayload> {
        try {
            return await this.jwtService.verifyAsync<AuthJwtPayload>(
                token,
                {
                    secret: this.jwtConfiguration.secret,
                }
            );
        } catch (error) {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }

    async logout(userId: number) {
        // Implementar blacklist de tokens ou invalidar no banco
        // Por enquanto, apenas log
        console.log(`Usuário ${userId} fez logout`);
        return { message: 'Logout realizado com sucesso' };
    }

    async validateUser(userId: number) {
        console.log('Validating user:', userId);
        
        try {
            // Simular validação no banco com tratamento de erro
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Aqui você conectaria com o banco para verificar se o usuário existe
            // const user = await this.userRepository.findById(userId);
            // if (!user) throw new UnauthorizedException('Usuário não encontrado');
            
            return { userId, isValid: true };
        } catch (error) {
            console.error('Erro ao validar usuário:', error);
            throw new UnauthorizedException('Falha na validação do usuário');
        }
    }
}
