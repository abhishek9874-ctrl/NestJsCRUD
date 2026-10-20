import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";



export class LoginDto {
    @IsEmail({}, { message: 'Please Provide a valid Email address' })
    email: string;


    @IsNotEmpty({ message: 'Password is Required!!! Please provide a valid password' })
    @MinLength(6, { message: 'Password must be atleast 6 characters long' })
    @MaxLength(50, { message: 'Password Cannot be longer than 50 characters' })
    password: string;
}