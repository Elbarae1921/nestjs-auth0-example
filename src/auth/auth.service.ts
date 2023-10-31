import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(
      (user) => user.username === username,
    );
    if (user && user.password === pass) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateAuth0User({ username, id }: { username: string; id: string }) {
    let user = await this.usersService.findOne(
      (user) => user.provider === 'auth0' && user.provider_id === id,
    );
    if (!user) {
      user = await this.usersService.add({
        password: '',
        provider: 'auth0',
        username: username,
        provider_id: id,
      });
    }
    const { password: _, ...result } = user;
    return result;
  }
}
