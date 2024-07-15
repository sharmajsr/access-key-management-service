// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private static readonly ALLOWED_TOKEN = 'static-jwt-token'; 

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; 

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        if (token !== JwtAuthGuard.ALLOWED_TOKEN) {
            throw new UnauthorizedException('Invalid token');
        }

        return true; // Token is valid
    }
}
