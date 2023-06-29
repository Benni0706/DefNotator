import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { randomBytes, pbkdf2Sync } from "crypto";

const prisma = new PrismaClient();

const addUser = async (req: Request, res: Response) => {
    if (req.query.name && req.query.password && req.query.email) {
        const user = await prisma.user.findUnique({
            where: {
                name: req.query.name.toString()
            }
        });
        if (!user) {
            const token: string = randomBytes(256).toString('hex');
            const salt = randomBytes(16).toString('hex');
            const passwordHash = pbkdf2Sync(req.query.password.toString(), salt, 1000, 64, `sha512`).toString(`hex`);
            const newuser = await prisma.user.create({
                data: {
                    name: req.query.name.toString(),
                    email: req.query.email.toString(),
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

const getUser = async (req: Request, res: Response) => {
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

const login = async (req: Request, res: Response) => {
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
            res.status(404).send('User not found')
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

const logout = async (req: Request, res: Response) => {
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

const deleteUser = async (req: Request, res: Response) => {
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

const getDatasetsFromUser = async (req: Request, res: Response) => {
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

module.exports = {
    addUser,
    getUser,
    login,
    logout,
    deleteUser,
    getDatasetsFromUser
}