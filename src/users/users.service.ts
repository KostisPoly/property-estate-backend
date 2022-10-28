import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repository: Repository<User>) {
        
    }

    create(email: string, password: string){
        const userObj = this.repository.create({ email, password });

        return this.repository.save(userObj);
    }

    findOne(id: number) {
        //Refactor  return null if id not set ( session set to null)
        if ( !id ) {
            return null;
        }
        return this.repository.findOneBy( { id });
    }

    findByEmail(email: string) {
        return this.repository.findBy( { email });
    }

    async update(id: number, attrs: Partial<User>) {//Pass attrs ( partial obj) to search and update partially data props
        const userObj = await this.findOne(id);

        if ( !userObj ) {
            console.log(`No user found by ID ${id}`);
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
