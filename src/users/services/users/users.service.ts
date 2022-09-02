import { Injectable } from '@nestjs/common';
import { CreateUserType } from '../../../utils/types';

@Injectable()
export class UsersService {
  private fakeusers = [
    {
      username: 'John Doe',
      email: 'johndoe1@gmail.com',
    },
    {
      username: 'John Cena',
      email: 'johndoe12@gmail.com',
    },
    {
      username: 'Doe Emily',
      email: 'johndoe14@gmail.com',
    },
  ];
  fetchUser() {
    return this.fakeusers;
  }
  createUser(userDetails: CreateUserType) {
    this.fakeusers.push(userDetails);
    return this.fakeusers;
  }
  getUserById(id: number) {
    //return null;
    return { username: 'johndoe', email: 'johndoe@gmail.com' };
  }
}
