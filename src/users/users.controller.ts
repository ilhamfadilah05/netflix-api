import { Body, Controller, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { userLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('login')
    async loginUser(@Body() body: userLoginDto) {
        const { email, password } = body;
        return this.usersService.validateUser(body);
    }

    @Post('register')
    async registerUser(@Body() body: createUserDto) {
        const { name, email, password } = body;
        return this.usersService.register(body);
    }

}
