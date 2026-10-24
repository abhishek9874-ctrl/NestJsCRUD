import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuards } from './guards/roles-guards';

@Module({
  imports:[
      TypeOrmModule.forFeature([User]),
      //Passport module
      PassportModule,

      JwtModule.register({})
    ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RolesGuards],
  exports:[AuthService,RolesGuards],
})
export class AuthModule {}
