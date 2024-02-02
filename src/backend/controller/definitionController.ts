import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const addDefinition = async (req: Request, res: Response) => {
    if (req.body.content) {
        await prisma.definition.create({
            data: {
                content: req.body.content.toString()
            }
        });
        res.end();
    } else {
        res.status(400).send('parameter missing');
    }
}

export const assignDefinition = async (req: Request, res: Response) => {
    if (!isNaN(Number(req.body.definitionId)) && req.body.datasetName) {
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
            await prisma.definition.update({
                where: {
                    id: Number(req.body.definitionId)
                },
                data: {
                    datasets: {
                        connect: [
                            {
                                name: req.body.datasetName.toString()
                            }
                        ]
                    }
                }
            });
            res.end();
        } else {
            res.status(401).end();
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

export const unassignDefinition = async (req: Request, res: Response) => {
    if (!isNaN(Number(req.body.definitionId)) && req.body.datasetName) {
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
            await prisma.definition.update({
                where: {
                    id: Number(req.body.definitionId)
                },
                data: {
                    datasets: {
                        disconnect: [
                            {
                                name: req.body.datasetName.toString()
                            }
                        ]
                    }
                }
            });
            res.end();
        } else {
            res.status(401).end();
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

export const getDefinitions = async (req: Request, res: Response) => {
    const definitions = await prisma.definition.findMany();
    res.send(definitions);
}

export const getDefinition = async (req: Request, res: Response) => {
    if (!isNaN(Number(req.params.definitionId))) {
        const definition = await prisma.definition.findUnique({
            where: {
                id: Number(req.params.definitionId)
            }
        });
        res.send(definition);
    } else {
        res.status(400).end();
    }
}
