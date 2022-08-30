import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUser() {
    return { email: 'alihassan@gmail.com', password: 'alihassan' };
  }
  @Get('posts')
  getPosts() {
    return [
      {
        name: 'Ali Hassan',
        username: 'ali',
        posts: [
          {
            id: 1,
            title: 'Nest Js VS React Js',
          },
          {
            id: 2,
            title: 'Node Js VS ASP.net 6',
          },
        ],
      },
    ];
  }
  @Get('posts/comments')
  getPostComments() {
    return [
      {
        id: 1,
        title: 'Post title 1',
        comments: [
          {
            username: 'johndoe',
            profile_image: 'https://image.png.com',
            comment: 'Nice work lad',
          },
          {
            username: 'joh',
            profile_image: 'https://image.png.com',
            comment: 'God Job',
          },
          {
            username: 'doe',
            profile_image: 'https://image.png.com',
            comment: 'Amazing',
          },
        ],
      },
    ];
  }
  @Post('create-user')
  createuser(@Req() request: Request, @Res() response: Response) {
    response.send({
      message: 'Data received from user',
      data: request.body,
    });
  }

  @Post('createuser')
  createUserWithDto(
    @Body() userData: CreateUserDto,
    @Res() response: Response,
  ) {
    console.log(userData);
    response.send({
      message: 'User created successfullt',
      data: userData,
    });
  }
  // @Get(':id')
  // getUserById(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.params);
  //   response.send(request.params);
  // }
  @Get(':id')
  getUserById(@Param('id') id: string, @Res() response: Response) {
    console.log(id);
    response.send({ id: id });
  }
  @Get(':id/:postId')
  getUserByIdPostId(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Res() response: Response,
  ) {
    console.log(id);
    response.send({ id, postId });
  }
}
