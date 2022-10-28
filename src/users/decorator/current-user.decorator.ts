import { createParamDecorator, ExecutionContext} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        
        const request = context.switchToHttp().getRequest();
        
        const { userId } = request.session
        const currentUser = userId;
        
        return data ? currentUser?.[data] : currentUser;
    }
)