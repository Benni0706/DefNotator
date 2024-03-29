import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const addAnnotation = async (req: Request, res: Response) => {
    if (Number(req.body.criteriaId) && Number(req.body.definitionId) && req.body.datasetName && req.body.applies) {
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
            const annotation = await prisma.annotation.count({
                where: {
                    criteria: {
                        id: Number(req.body.criteriaId)
                    },
                    definition: {
                        id: Number(req.body.definitionId)
                    },
                    dataset: {
                        name: req.body.datasetName.toString()
                    },
                    user: {
                        id: res.locals.userId
                    }
                }
            });
            if (annotation == 0) {
                await prisma.annotation.create({
                    data: {
                        criteria: {
                            connect: {
                                id: Number(req.body.criteriaId)
                            }
                        },
                        definition: {
                            connect: {
                                id: Number(req.body.definitionId)
                            }
                        },
                        dataset: {
                            connect: {
                                name: req.body.datasetName.toString()
                            }
                        },
                        user: {
                            connect: {
                                id: res.locals.userId
                            }
                        },
                        applies: req.body.applies === 'true'
                    }
                });
            } else {
                res.send('annotation already exists');
            }
        } else {
            res.status(401).end();
        }
        res.end();
    } else {
        res.status(400).send('parameter missing');
    }
}

export const updateAnnotation = async (req: Request, res: Response) => {
    if (Number(req.body.annotationId) && req.body.applies) {
        const access = await prisma.annotation.findFirst({
            where: {
                id: Number(req.body.annotationId),
                user: {
                    id: res.locals.userId
                }
            }
        });
        if (access) {
            const annotation = await prisma.annotation.update({
                where: {
                    id: Number(req.body.annotationId)
                },
                data: {
                    applies: req.body.applies === 'true'
                }
            });
            console.log('ey')
            res.end();
        } else {
            res.status(401).end();
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

export const getAnnotation = async (req: Request, res: Response) => {
    if (Number(req.params.annotationId)) {
        const annotation = await prisma.annotation.findUnique({
            where: {
                id: Number(req.params.annotationId)
            },
            select: {
                id: true,
                applies: true
            }
        });
        res.send(annotation);
    } else {
        res.status(400).send('parameter missing');
    }
}
