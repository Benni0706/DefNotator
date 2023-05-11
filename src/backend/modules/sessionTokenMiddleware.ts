/*
This method reads the sessionToken from the cookie of a HTTP Request. It then checks, if the sessionToken is valid.
If its valid, the next route handler is being called (for example "GET /users/datasets").
If its not valid, it sends back a 401 Unauthorized response and does NOT call the next route handler.
The function is being exported, which means it can be imported in other files. It can then be used as middleware.
*/
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function getUserId(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.sessionToken; 
    if (token) {
        const user = await prisma.user.findUnique({
            where: {
                sessionToken: token,
            },
            select: {
                id: true,
            },
        });
        if(user) {
            res.locals.userId = user.id;
            next();
        } else {
            res.status(401).end();
        }
    } else {
        res.status(401).end();
    }
}