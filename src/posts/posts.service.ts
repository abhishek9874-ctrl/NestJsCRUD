import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
    private posts: Post[] = [
        {
            id: 1,
            title: 'First',
            content: 'First Post content',
            authorName: 'Sangam',
            createdAt: new Date(),
        },
        {
            id: 2,
            title: 'Second',
            content: 'Second Post content',
            authorName: 'Rahul',
            createdAt: new Date(),
        },
        {
            id: 3,
            title: 'Third',
            content: 'Third Post content',
            authorName: 'Priya',
            createdAt: new Date(),
        },
        {
            id: 4,
            title: 'Fourth',
            content: 'Fourth Post content',
            authorName: 'Aman',
            createdAt: new Date(),
        },
        {
            id: 5,
            title: 'Fifth',
            content: 'Fifth Post content',
            authorName: 'Neha',
            createdAt: new Date(),
        },
        {
            id: 6,
            title: 'Sixth',
            content: 'Sixth Post content',
            authorName: 'Rohit',
            createdAt: new Date(),
        },
        {
            id: 7,
            title: 'Seventh',
            content: 'Seventh Post content',
            authorName: 'Anjali',
            createdAt: new Date(),
        },
        {
            id: 8,
            title: 'Eighth',
            content: 'Eighth Post content',
            authorName: 'Vikash',
            createdAt: new Date(),
        },
        {
            id: 9,
            title: 'Ninth',
            content: 'Ninth Post content',
            authorName: 'Pooja',
            createdAt: new Date(),
        },
        {
            id: 10,
            title: 'Tenth',
            content: 'Tenth Post content',
            authorName: 'Karan',
            createdAt: new Date(),
        },
        {
            id: 11,
            title: 'Eleventh',
            content: 'Eleventh Post content',
            authorName: 'Sneha',
            createdAt: new Date(),
        },
        {
            id: 12,
            title: 'Twelfth',
            content: 'Twelfth Post content',
            authorName: 'Arjun',
            createdAt: new Date(),
        },
        {
            id: 13,
            title: 'Thirteenth',
            content: 'Thirteenth Post content',
            authorName: 'Simran',
            createdAt: new Date(),
        },
        {
            id: 14,
            title: 'Fourteenth',
            content: 'Fourteenth Post content',
            authorName: 'Aditya',
            createdAt: new Date(),
        },
        {
            id: 15,
            title: 'Fifteenth',
            content: 'Fifteenth Post content',
            authorName: 'Riya',
            createdAt: new Date(),
        },
        {
            id: 16,
            title: 'Sixteenth',
            content: 'Sixteenth Post content',
            authorName: 'Nikhil',
            createdAt: new Date(),
        },
        {
            id: 17,
            title: 'Seventeenth',
            content: 'Seventeenth Post content',
            authorName: 'Kavya',
            createdAt: new Date(),
        },
        {
            id: 18,
            title: 'Eighteenth',
            content: 'Eighteenth Post content',
            authorName: 'Varun',
            createdAt: new Date(),
        },
        {
            id: 19,
            title: 'Nineteenth',
            content: 'Nineteenth Post content',
            authorName: 'Ishita',
            createdAt: new Date(),
        },
        {
            id: 20,
            title: 'Twentieth',
            content: 'Twentieth Post content',
            authorName: 'Sahil',
            createdAt: new Date(),
        },
    ];

    findAll(): Post[] {
        return this.posts;
    }

    findOne(id: number): Post {
        const singlePost = this.posts.find((post) => post.id === id);
        if (!singlePost) {
            throw new NotFoundException(`Post with ${id} is not found...!!!!`)
        }
        return singlePost
    }

    create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
        const newPost: Post = {
            id: this.getNextId(),
            ...createPostData,
            createdAt: new Date()
        }
        this.posts.push(newPost)
        return newPost
    }


    update(
        id: number,
        updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>
    ): Post {
        const currentPostIndexToEdit = this.posts.findIndex(post => post.id === id);

        if (currentPostIndexToEdit === -1) {
            throw new NotFoundException(`Post with ${id} is not found...!!!`)
        }

        this.posts[currentPostIndexToEdit] = {
            ...this.posts[currentPostIndexToEdit],
            ...updatePostData,
            updatedAt: new Date()
        }
        return this.posts[currentPostIndexToEdit];
    }

    remove(id:number):{message:string}{
        const currentPostIndexToDelete=this.posts.findIndex(
            (post)=>post.id===id,
        );
        if(currentPostIndexToDelete ===-1){
            throw new NotFoundException(`Post with ${id} is not found..!!!`);
        }
        this.posts.splice(currentPostIndexToDelete,1);
        return {message:`Post with ${id} has been deleted..!!`}
    }

    private getNextId(): number {
        return this.posts.length > 0 ?
            Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    }
}
