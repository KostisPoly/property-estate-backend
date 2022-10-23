import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToInstance } from 'class-transformer'

//Wrapper function to call ( decorator in logic)
export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto)); //nest magic instanciate and return
}

//ts NestInterceptor implement in custom class interceptor
export class SerializeInterceptor implements NestInterceptor{

    //Need to customize interceptor to initialize with apropriate Dto
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //Run before request handle in handler and return

        return next.handle().pipe(
            map((data: any) => {//Magic to map data from response to dto accepted data and return
                //Run before response is sent
                return plainToInstance(this.dto, data, {excludeExtraneousValues: true})//Only marked with expose values directive
            })
        )
    }
}