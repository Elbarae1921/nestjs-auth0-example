import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      provider: 'local',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      provider: 'local',
    },
  ];

  async findOne(filterFn: (user: User) => boolean): Promise<User | undefined> {
    return this.users.find(filterFn);
  }

  async add(user: Omit<User, 'userId'>) {
    const lastId = this.users.sort((a, b) => a.userId - b.userId)[0].userId;
    const userData = { ...user, userId: lastId + 1 };
    this.users.push(userData);
    return userData;
  }
}
