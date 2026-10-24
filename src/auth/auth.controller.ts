import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { currentUser } from './decorators/curren-user.decorator';
import { UserRole } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuards } from './guards/roles-guards';
import { Roles } from './decorators/roles.decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body() registerDto:RegisterDto){
        return this.authService.Register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.Login(loginDto);
    }


    @Post('refresh')
    refreshToken(@Body('refreshToken') refreshToken:string){
        return this.authService.refreshToken(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@currentUser() user:any){
        return user
    }


    @Post('create-admin')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuards)
    createAdmin(@Body() registerDto:RegisterDto){
        return this.authService.createAdmin(registerDto)
    }
}


