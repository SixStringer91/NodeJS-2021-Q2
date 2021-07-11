import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [UsersModule]
})
export class LoginModule {}
