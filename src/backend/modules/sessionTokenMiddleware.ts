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