import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthService {
    async login() {
        
        return { accessToken: 'token' };
    }

    async validateUser(userId: number) {
        // Lógica para validar o usuário com base nos dados do Google
        // Isso pode incluir verificar se o usuário já existe no banco de dados
        // e, se não existir, criá-lo
        console.log('Validating user:', userId);

        // Simular atraso
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Aqui você pode adicionar a lógica para verificar o usuário no banco de dados
        return { userId };
    }
}
