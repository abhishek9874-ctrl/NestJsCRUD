import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorators";





@Injectable()
export class RolesGuards implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles=this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,[
                context.getHandler(),//Method level metadata
                context.getClass(),//Class Level metadata
            ]
        );
        if(!requiredRoles){
            return true;
        }

        const {user}=context.switchToHttp().getRequest();

        if(!user){
            throw new ForbiddenException("User not Authenticated....!!!")
        }

        const hasRequiredRoles=requiredRoles.some(role=>user.role===role)

        if(!hasRequiredRoles){
            throw new ForbiddenException("Insufficient permission")
        }

        return true;

    }
}