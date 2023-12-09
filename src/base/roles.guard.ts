import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Role } from "./base.entity";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { query : {role} } = context.switchToHttp().getRequest();
    const res =  requiredRoles.some((allowed_role) => role ? role?.includes(allowed_role) : false);
    if(!res) {
        throw new HttpException('Not Authorized for this function', HttpStatus.FORBIDDEN)
    }
    return res;
  }
}