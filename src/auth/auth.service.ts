import { Injectable } from '@nestjs/common';
import { IntimidatorsUsersService } from 'src/intimidators-users/intimidators-users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private intimidatorsUsersService: IntimidatorsUsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: { userName: string; password: string }): Promise<any> {
    if (!user.userName || !user.password) {
      return null;
    }
    const foundUser = await this.intimidatorsUsersService.findUserName(
      user.userName,
    );
    if (foundUser && foundUser.password) {
      const isMatchPasswords = await bcrypt.compare(
        user.password,
        foundUser.password,
      );
      if (isMatchPasswords) {
        return foundUser;
      }
    }
    return null;
  }

  async login(user: any): Promise<{ access_token?: string; msg?: string }> {
    const validUser = await this.validateUser(user);
    if (!validUser) {
      return { msg: 'User name or password is wrong' };
    }
    const payload = {
      userName: validUser.userName,
      sub: validUser.id,
      join: new Date(validUser.date).getTime(),
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
