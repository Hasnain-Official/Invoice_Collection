// custom.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CustomMiddlewareService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req?.query?.token || !req?.query?.role) {
        return {status : 400, message : `Missing required parameters : token or role in query`};
    }
    // const token = req?.query?.token;
    // const role = req?.query?.role;
    // if(!(token === 'aqazwsxedcrfvtgbyhnujmikolpa' || token === 'qazwsxedcrfvtgbyhnujmikolp')) {
    //     return {status : 400, message : `Invalid Token!, You are not Authorized`};
    // }
    console.log('Custom Middleware');
    next(); // Pass control to the next middleware or route handler
  }
}
