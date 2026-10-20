import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>,
        private jwtService:JwtService
    ){}

    async Register(registerDto:RegisterDto){
        const ExistingUser=await this.usersRepository.findOne({
            where:{email:registerDto.email}
        })

        if(ExistingUser){
            throw new ConflictException("Email already registerd!! please login with this  email or use another email for registered..!!")
        }

        const hashedPassword=await this.hashPassword(registerDto.password)

        const newlyCreatedUser=this.usersRepository.create({
            email:registerDto.email,
            name:registerDto.name,
            password:hashedPassword,
            role:UserRole.USER
        })
        const saveUser=await this.usersRepository.save(newlyCreatedUser);
        const {password,...result}=saveUser;
        return{
            user:result,
            message:'Registeration successfully !!! Please login to continue '
        }
    }

    async  createAdmin(registerDto:RegisterDto){
        const ExistingUser=await this.usersRepository.findOne({
            where:{email:registerDto.email}
        })

        if(ExistingUser){
            throw new ConflictException("Email already registerd!! please login with this  email or use another email for registered..!!")
        }

        const hashedPassword=await this.hashPassword(registerDto.password)

        const newlyCreatedUser=this.usersRepository.create({
            email:registerDto.email,
            name:registerDto.name,
            password:hashedPassword,
            role:UserRole.ADMIN
        })
        const saveUser=await this.usersRepository.save(newlyCreatedUser);
        const {password,...result}=saveUser;
        return{
            user:result,
            message:'Admin Registered successfully !!! Please login to continue '
        }
    }

    async Login(loginDto:LoginDto){
        const user=await this.usersRepository.findOne({
            where:{email:loginDto.email}
        })
        if(!user || !(await this.verifyPassword(loginDto.password,user.password))){
            throw new UnauthorizedException("Invalid Credentials or user is not registerd !!!")
        }

        const tokens= this.generateTokens(user);
        const {password,...result}=user;
        return{
            user:result,
            ...tokens
        }

    }

    async refreshToken(refreshToken:string){
       try {

         const payload=await this.jwtService.verify(refreshToken,{
            secret:'refresh_token'
        })

        const user=await this.usersRepository.findOne({
            where:{id:payload.sub}
        })
        if(!user){
            throw new UnauthorizedException("Invalid token")
        }


        const  accessToken=this.generateAccessToken(user);

        return {accessToken}

       } catch (error) {
        throw new UnauthorizedException("Invalid token")
       }
    }

    private async hashPassword(password:string):Promise<string>{
        return bcrypt.hash(password,10);
    }

    private async verifyPassword(plainPassword:string,hashedPassword:string):Promise<boolean>{
        return bcrypt.compare(plainPassword,hashedPassword)
    }

    private async generateTokens(user:User){
        return{
            accessToken:this.generateAccessToken(user),
            refreshToken:this.generateRefreshToken(user)
        }
    }

    private generateAccessToken(user:User):string{
        const payload={
            email:user.email,
            sub:user.id,
            role:user.role
        }
        return this.jwtService.sign(payload,{
            secret:'jwt_secret',
            expiresIn:'15m',
        });
    }


    private generateRefreshToken(user:User):string{
         const payload={
            sub:user.id
        }
        return this.jwtService.sign(payload,{
            secret:'refresh_secret',
            expiresIn:'7d',
        });
    }
}
