import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { randomBytes, pbkdf2Sync } from "crypto";

const prisma = new PrismaClient();

export const addUser = async (req: Request, res: Response) => {
    if (req.body.name && req.body.password && req.body.email) {
        const user = await prisma.user.findUnique({
            where: {
                name: req.body.name.toString()
            }
        });
        if (!user) {
            const token: string = randomBytes(256).toString('hex');
            const salt = randomBytes(16).toString('hex');
            const passwordHash = pbkdf2Sync(req.body.password.toString(), salt, 1000, 64, `sha512`).toString(`hex`);
            const newuser = await prisma.user.create({
                data: {
                    name: req.body.name.toString(),
                    email: req.body.email.toString(),
                    password: passwordHash,
                    salt: salt,
                    sessionToken: token
                }
            });
            res.cookie('sessionToken', newuser.sessionToken);
            res.end();
        } else {
            res.status(404).send('please pick another name');
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

export const getUser = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: res.locals.userId
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    res.send(user);
}

export const getUserByName = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            name: req.params.userName,
        },
        select: {
            id: true,
            name: true,
            // email: true,
        },
    });
    res.send(user);
}

export const login = async (req: Request, res: Response) => {
    if (req.body.name && req.body.password) {
        const user = await prisma.user.findUnique({
            where: {
                name: req.body.name.toString()
            }
        });
        if (user) {
            let passwordHash = pbkdf2Sync(req.body.password.toString(), user.salt, 1000, 64, `sha512`).toString(`hex`);
            if (passwordHash === user.password) {
                const token: string = randomBytes(256).toString('hex');
                const updatedUser = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        sessionToken: token
                    }
                });
                res.cookie('sessionToken', updatedUser.sessionToken);
                res.end();
            } else {
                res.status(401).end();
            }
        } else {
            res.status(401).end();
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

export const logout = async (req: Request, res: Response) => {
    await prisma.user.update({
        where: {
            id: res.locals.userId
        },
        data: {
            sessionToken: null
        }
    });
    res.clearCookie('sessionToken');
    res.end();
}

export const deleteUser = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: res.locals.userId
        }
    })
    if (user) {
        await prisma.user.delete({
            where: {
                id: res.locals.userId
            }
        });
        await prisma.dataset.deleteMany({
            where: {
                access: {
                    none: {}
                }
            }
        });
        res.end();
    } else {
        res.status(404).send('user not found');
    }
}

export const getDatasetsFromUser = async (req: Request, res: Response) => {
    const datasets = await prisma.access.findMany({
        where: {
            user: {
                id: res.locals.userId
            }
        },
        select: {
            role: true,
            dataset: {
                select: {
                    name: true
                }
            }
        }
    });
    res.send(datasets);
}
