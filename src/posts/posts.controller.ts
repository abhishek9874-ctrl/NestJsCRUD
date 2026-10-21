import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostExistsPipe } from './pipes/posts-exists';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsservice: PostsService) { }

    @Get()
    async findAll():Promise<PostEntity[]>{
        return this.postsservice.findAll()
    }
    


    @Get(':id')
    findOne(@Param('id',ParseIntPipe,PostExistsPipe)id:number):
    Promise<PostEntity>{
        return this.postsservice.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createPostData:CreatePostDto):Promise<PostEntity>{
        return  this.postsservice.create(createPostData);
    }

    @Put(':id')
    async update(
        @Param("id",ParseIntPipe,PostExistsPipe) id:number,
        @Body() updatePostData:UpdatePostDto
    ): Promise<PostEntity>{
        return this.postsservice.update(id,updatePostData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id',ParseIntPipe,PostExistsPipe) id:number):Promise<void>{
        this.postsservice.remove(id);
    }
}