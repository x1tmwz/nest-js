import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IntimidatorsUsersModule } from 'src/intimidators-users/intimidators-users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    IntimidatorsUsersModule,
    JwtModule.register({
      secret: process.env.secretKey,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
