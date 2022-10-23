import { Controller, Post, Body, Get, Delete, Patch, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor( private usersService: UsersService) {}

    //Parsed query param is always a string
    //string id parseint(id) after query - Cast to int in service

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create( body.email, body.password)
    }

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
