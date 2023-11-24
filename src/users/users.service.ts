import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { createUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { userLoginDto } from './dto/user-login.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    async findByEmail(filter: userLoginDto): Promise<User | undefined> {
        const { email } = filter;
        return this.userRepo.findOne({ where: { email } });
    }

    async validateUser(filter: userLoginDto): Promise<any> {
        const { email, password } = filter;
        const user = await this.findByEmail(filter);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return {
                stausCode: 200,
                message: 'Successfully login',
                data: {
                    'name': user.name,
                    'email': user.email
                }
            };
        }
        throw new NotFoundException(`User not found`);
    }

    async register(filter: createUserDto): Promise<any> {
        const { name, email, password } = filter;
        const user = await this.findByEmail(filter);
        if (user) {
            throw new BadRequestException(`Email already exists!`);
        }
        if (name && email && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const createUserBcrypt: createUserDto = {
                name: name,
                email: email,
                password: hashedPassword
            }
            return {
                statusCode: 201,
                message: 'Successfully add user.'
            };
        }
        throw new BadRequestException(`[name, email, password] is required!`);

    }
}
