import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type {Post as PostInterface } from './interfaces/post.interface'
import { CreatePostDto } from './dto/create-post.dto';
import { PostExistsPipe } from './pipes/posts-exists';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsservice: PostsService) { }

    @Get()
    findAll(@Query('search') search?: string): PostInterface[] {
        const extractAllPosts = this.postsservice.findAll();

        if (search) {
            return extractAllPosts.filter((singlePost) =>
                singlePost.title.toLowerCase().includes(search.toLowerCase()),
            );
        }
        return extractAllPosts;
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe,PostExistsPipe)id:number):PostInterface{
        return this.postsservice.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body() createPostData:CreatePostDto):PostInterface{
        return this.postsservice.create(createPostData);
    }

    @Put(':id')
    update(
        @Param("id",ParseIntPipe,PostExistsPipe) id:number,
        @Body() updatePostData:CreatePostDto
    ): PostInterface{
        return this.postsservice.update(id,updatePostData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id',ParseIntPipe,PostExistsPipe) id:number):void{
        this.postsservice.remove(id);
    }
}