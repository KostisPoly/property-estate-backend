import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { UsersService } from '../users.service'
import { User } from '../user.entity'

interface CurrentUser {
    id: number;
    email: string;
    admin: boolean;
}

//Modify global express request type adding currentuser
declare global {
    namespace Express {
        interface Request {
            currentUser?: CurrentUser;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    
    constructor(private userService: UsersService) {}
    async use( req: Request, res: Response, next: NextFunction ) {
        const { userId } = req.session || {};
        
        if (userId) {
            const user = await this.userService.findOne(userId);
            
            const currentUser : CurrentUser = {
                id: user.id,
                email: user.email,
                admin: user.admin
            }
            
            req.currentUser = currentUser;
        }

        next();
    }
}