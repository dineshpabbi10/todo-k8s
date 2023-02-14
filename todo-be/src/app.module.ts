import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListController } from './Controller/ListController';
import { ListItemController } from './Controller/ListItemController';
import { UserController } from './Controller/UserController';
import { List } from './Entities/List';
import { ListItem } from './Entities/ListItem';
import { User } from './Entities/Users';
import { EncryptionService } from './Providers/EncryptionService';
import { JwtStrategy } from './Providers/JwtStrategy';
import { ListItemService } from './Providers/ListItemService';
import { ListService } from './Providers/ListService';
import { UserService } from './Providers/UserService';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities : true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      List,
      ListItem,
      User
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController,ListController,ListItemController,UserController],
  providers: [AppService,ListService,ListItemService,UserService,JwtStrategy,EncryptionService],
})
export class AppModule {}
