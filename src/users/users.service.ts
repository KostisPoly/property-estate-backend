import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repository: Repository<User>) {
        
    }

    create(email: string, password: string){
        const user = this.repository.create({ email, password });

        return this.repository.save(user);
    }

    findOne(id: number) {
        return this.repository.findOneBy( { id });
    }

    findByEmail(email: string) {
        return this.repository.findBy( { email });
    }

    async update(id: number, attrs: Partial<User>) {//Pass attrs ( partial obj) to search and update partially data props
        const userObj = await this.findOne(id);

        if ( !userObj ) {
            console.log(`No use found by ID ${id}`);
        }

        //Assign attrs to target obj and save
        Object.assign(userObj, attrs);

        return this.repository.save(userObj);
    }

    async remove(id: number) {

        const userObj = await this.findOne(id);

        if ( !userObj ) {
            console.log(`No use found by ID ${id}`);
        }

        return this.repository.remove(userObj);
    }
}
