import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addDefinition = async (req: Request, res: Response) => {
    if (req.query.content) {
        await prisma.definition.create({
            data: {
                content: req.query.content.toString()
            }
        });
        res.end();
    } else {
        res.status(400).send('parameter missing');
    }
}

const assignDefinition = async (req: Request, res: Response) => {
    if (!isNaN(Number(req.query.definitionId)) && req.query.datasetName) {
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
            await prisma.definition.update({
                where: {
                    id: Number(req.query.definitionId)
                },
                data: {
                    datasets: {
                        connect: [
                            {
                                name: req.query.datasetName.toString()
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

const unassignDefinition = async (req: Request, res: Response) => {
    if (!isNaN(Number(req.query.definitionId)) && req.query.datasetName) {
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
            await prisma.definition.update({
                where: {
                    id: Number(req.query.definitionId)
                },
                data: {
                    datasets: {
                        disconnect: [
                            {
                                name: req.query.datasetName.toString()
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

const getDefinitions = async (req: Request, res: Response) => {
    const definitions = await prisma.definition.findMany();
    res.send(definitions);
}

const getDefinition = async (req: Request, res: Response) => {
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

module.exports = {
    addDefinition,
    assignDefinition,
    unassignDefinition,
    getDefinitions,
    getDefinition
}