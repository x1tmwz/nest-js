import { Injectable } from '@nestjs/common';
import { IntimidatorsUsersService } from 'src/intimidators-users/intimidators-users.service';
import { JwtService } from '@nestjs/jwt';
import { bcrypt } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private intimidatorsUsersService: IntimidatorsUsersService,
    private jwtServie: JwtService,
  ) {}
  private createJwt(): string {
    return '';
  }
  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.intimidatorsUsersService.findOne(userName);
    if(user && user.password){
      const isMatchPasswords = await bcrypt.compare(pass,user.password)
      if(isMatchPasswords){
        return {userName}

      }
    }
    return null;
  }

  login(user:any): {access_token:string} {
    const payload = { userName: user.userName, sub: user.id };
    return {access_token:this.jwtServie.sign(payload)}
  }
}
