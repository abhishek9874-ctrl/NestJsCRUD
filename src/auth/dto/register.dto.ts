import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";




export class RegisterDto{
    @IsEmail({},{message:'Please Provide a valid Email address'})
    email:string;

    @IsNotEmpty({message:'Name is Required!!! Please provide a valid name'})
    @IsString({message:'Name must be a string'})
    @MinLength(3,{message:'Name must be atleast 3 characters long'})
    @MaxLength(50,{message:'Name Cannot be longer than 50 characters'})
    name:string;


    @IsNotEmpty({message:'Password is Required!!! Please provide a valid password'})
    @MinLength(6,{message:'Password must be atleast 6 characters long'})
    @MaxLength(50,{message:'Password Cannot be longer than 50 characters'})
    password:string;



}