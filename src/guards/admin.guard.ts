import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


export class AdminGuard implements CanActivate{
    

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //Get request from context and check user
        const request = context.switchToHttp().getRequest();

        if (!request.session.userId || !request.currentUser) {
            return false;
        }
        const admin = request.currentUser?.admin ?? false;

        return !admin;
    }
}