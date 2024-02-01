import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const addAccess = async (req: Request, res: Response) => {
    if (req.body.userName && req.body.datasetName) {
        const userAccess = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                role: "OWNER",
                dataset: {
                    name: req.body.datasetName.toString()
                }
            }
        });
        if (userAccess) {
            await prisma.access.create({
                data: {
                    user: {
                        connect: {
                            name: req.body.userName.toString()
                        }
                    },
                    dataset: {
                        connect: {
                            name: req.body.datasetName.toString()
                        }
                    }
                }
            });
            res.end();
        } else {
            res.status(401).end();
        }
    } else {
        res.status(400).send("parameter missing");
    }
}

export const deleteAccess = async (req: Request, res: Response) => {
    if (req.body.userName && req.body.datasetName) {
        const access = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                dataset: {
                    name: req.body.datasetName.toString()
                }
            }
        });
        if (access) {
            if (access.role == 'OWNER' && res.locals.userName != req.body.userName) {
                await prisma.access.deleteMany({
                    where: {
                        user: {
                            name: req.body.userName.toString()
                        },
                        dataset: {
                            name: req.body.datasetName.toString()
                        }
                    }
                });
            } else if (access.role == 'USER' && res.locals.userName == req.body.userName ) {
                await prisma.access.deleteMany({
                    where: {
                        user: {
                            id: res.locals.userId
                        },
                        dataset: {
                            name: req.body.datasetName.toString()
                        }
                    }
                });
            } else {
                res.status(400).send("can't delete access for this user");
            }
            res.end();
        } else {
            res.status(401).end();
        }
    } else {
        res.status(400).send("parameter missing");
    }
}
