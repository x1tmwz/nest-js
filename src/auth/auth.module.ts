import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IntimidatorsUsersModule } from 'src/intimidators-users/intimidators-users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    IntimidatorsUsersModule,
    PassportModule,
    JwtModule.register({
      secret: "tomer is the king",
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService],
  controllers:[AuthController]
})
export class AuthModule {}
