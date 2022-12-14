import { Controller, Post, Body, Get, Delete, Patch, Param, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { DefaultUserDto } from './dto/default-user.dto';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(DefaultUserDto)
@Controller('auth')
export class UsersController {

    constructor( private usersService: UsersService, private authService: AuthService) {}

    //Parsed query param is always a string
    //string id parseint(id) after query - Cast to int in service

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.createAuth(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/login')
    async login(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.validateAuth(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/logout')
    logout(@Session() session: any) {
        //Set session to null 
        session.userId = null;
    }

    @UseGuards(AuthGuard)
    @Get('/current-user')
    getCurrentUser(@Session() session: any) {
        return this.usersService.findOne(session.userId);
    }

    // @UseInterceptors(new SerializeInterceptor(DefaultUserDto))//Custom interceptor in get user with default user dto
    // @Serialize(DefaultUserDto)
    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsersByEmail(@Query('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
