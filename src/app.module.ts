import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

@Module({
  imports:
    [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            // type: 'sqlite',
            // database: config.get<string>('DB_NAME'),
            type: 'mysql',
            database: 'test',
            port: 3306,
            host: 'host.docker.internal',
            username: 'root',
            password: 'root',
            synchronize: true,//PRODUCTION REMOVE WARNING
            entities: [User, Report]
          }
        }
      }),
      UsersModule,
      ReportsModule,
      // TypeOrmModule.forRoot({
      //   type: 'mysql',
      //   name: 'mysql_test',
      //   host: 'host.docker.internal',
      //   port: 3306,
      //   username: 'root',
      //   password: 'root',
      //   database: 'test',
      //   entities: [User, Report],
      //   synchronize: true,
      // }),
      // TypeOrmModule.forRoot({
      //   type: 'sqlite',
      //   database: 'db.sqlite',
      //   entities: [User, Report],
      //   synchronize: true
      // }),
      
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  //Add configservice injection
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService
    ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: [this.configService.get('COOKIE_KEY')],
      })
    ).forRoutes('*');
  }
}
