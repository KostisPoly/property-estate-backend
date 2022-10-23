import { Injectable } from '@nestjs/common'
import { UsersService } from './users.service';
import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'


const scryptPromise = promisify(scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async createAuth(email: string, password: string) {
        //Check email exists and if not hash, save, return
        //Find by email returns array maybe reformat logic
        const usersArray = await this.usersService.findByEmail(email);

        //Array of users so check length not 0
        if (usersArray.length) {
            console.log('Email already used');
        }

        //hash encrypt save to db
        const salt = randomBytes(8).toString('hex');

        const hash = await scryptPromise( password, salt, 16);

        const hashedPass = salt + '-' + hash.toString();
    
        const user = await this.usersService.create(email, hashedPass);

        return user;
    }

    async validateAuth(email: string, password: string) {
        //Find by email returns array maybe reformat logic
        const usersArray = await this.usersService.findByEmail(email);

        const userObj = usersArray[0];

        if ( usersArray.length < 1 ) {
            console.log('Not found by Email');
        }

        //salt and hash stored with - between
        const [ salt, hashDb ] = userObj.password.split('-');

        const hash = await scryptPromise(password, salt, 16);

        //Check matched hash
        if( hash.toString() === hash) {
            return userObj;
        } else {
            console.log('Password mismatch');
        }
    }
}