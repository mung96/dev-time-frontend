import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { dataSourceOptions } from 'src/config/typeorm.config';
import { MemberModule } from 'src/member/member.module';
import { SignupModule } from 'src/signup/signup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: true,
      }),
    }),
    MemberModule,
    AuthModule,
    SignupModule,
  ],
})
export class AppModule {}
