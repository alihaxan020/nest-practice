import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { ValidateCreateUserPipe } from '../../pipes/validate-create-user.pipe';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUser() {
    return this.userService.fetchUser();
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
  @UsePipes(new ValidationPipe())
  createUserWithDto(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(typeof userData.age);
    return this.userService.createUser(userData);
  }
  // @Get(':id')
  // getUserById(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.params);
  //   response.send(request.params);
  // }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return this.userService.getUserById(id);
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

  @Get('sort')
  getUserBySortQuery(
    @Query('sortBy') sortBy: string,
    @Res() response: Response,
  ) {
    console.log(sortBy);
    response.send({ message: 'Query received', data: sortBy });
  }
}
