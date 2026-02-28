import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class RequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const timeNow = new Date();

        return next.handle().pipe(
            tap(() => {
                const response: Response = context.switchToHttp().getResponse();
                const timeTaken = new Date().getTime() - timeNow.getTime();
                console.log(`[${timeNow.toLocaleString()}] ${request.method} to ${request.url} - ${response.statusCode} took ${timeTaken}ms`);
            })
        );
    }
}