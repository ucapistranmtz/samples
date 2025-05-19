import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import LoggerService from '@utils/logger';

const loger= LoggerService.getLogger();

declare module 'express-serve-static-core' {
    interface Request {
        traceId?: string;
    }
}


export const traceMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Generate a unique trace ID for each request
    // and attach it to the request object
    // This trace ID can be used for logging and tracking purposes
    // It helps to identify the request in the logs
    // and trace the flow of the request through the application
    // It is a good practice to use a unique trace ID for each request
    // to help with debugging and troubleshooting
    req.traceId = uuidv4();
    if(process.env.NODE_ENV !== 'production'){
        loger.info(`new Trace ID: ${req.traceId} generated for the request`);
    }
    // Moving to the next middleware
    // or route handler
    // This is important to ensure that the request is processed
    // and the response is sent back to the client
    // If we don't call next(), the request will hang
    // and the client will not receive a response
    // This can lead to a bad user experience
    // and can cause the client to timeout
    // and give up waiting for a response

    next();
}