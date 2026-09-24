import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto{


    @IsNotEmpty({message:'Title is required..!!!'})
    @IsString({message:'Title must be a string..!!!'})
    @MinLength(3, {message:'Title must be at least 3 characters long'})
    @MaxLength(50,{message:'Title can not be longer than 50 characters'})
    title:string;

    @IsNotEmpty({message:'Content is required..!!!'})
    @IsString({message:'Content must be a string..!!!'})
    @MinLength(2, {message:'Content must be at least 2 characters long'})
    content:string;

    @IsNotEmpty({message:'Author Name is required..!!!'})
    @IsString({message:'Author Name must be a string..!!!'})
    @MinLength(2, {message:'Author Name must be at least 2 characters long.....!!!!!'})
    @MaxLength(10,{message:'Author Name can not be longer than 10 characters....!!!!!'})
    authorName:string;

}