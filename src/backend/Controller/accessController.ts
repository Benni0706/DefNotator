import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addAccess = async (req: Request, res: Response) => {
    if (req.query.userName && req.query.datasetName) {
        const userAccess = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                role: "OWNER",
                dataset: {
                    name: req.query.datasetName.toString()
                }
            }
        });
        if (userAccess) {
            await prisma.access.create({
                data: {
                    user: {
                        connect: {
                            name: req.query.userName.toString()
                        }
                    },
                    dataset: {
                        connect: {
                            name: req.query.datasetName.toString()
                        }
                    }
                }
            });
            res.end();
        }
        else {
            res.status(401).end();
        }
    }
    else {
        res.status(400).send("parameter missing");
    }
}

const deleteAccess = async (req: Request, res: Response) => {
    if (req.query.userName && req.query.datasetName) {
        const access = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                dataset: {
                    name: req.query.datasetName.toString()
                }
            }
        });
        if (access) {
            if (access.role == 'OWNER') {
                await prisma.access.deleteMany({
                    where: {
                        user: {
                            name: req.query.userName.toString()
                        },
                        dataset: {
                            name: req.query.datasetName.toString()
                        },
                        role: 'USER'
                    }
                });
            }
            else if (access.role == 'USER') {
                await prisma.access.deleteMany({
                    where: {
                        user: {
                            id: res.locals.userId,
                            name: req.query.userName.toString()
                        },
                        dataset: {
                            name: req.query.datasetName.toString()
                        }
                    }
                });
            }
            res.end();
        }
        else {
            res.status(401).end();
        }
    }
    else {
        res.status(400).send("parameter missing");
    }
}

module.exports = {
    addAccess,
    deleteAccess
}