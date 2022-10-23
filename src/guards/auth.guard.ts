import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //Get request from context and return session userid ( falsy if non present)
        const request = context.switchToHttp().getRequest();

        return request.session.userId;
    }
}