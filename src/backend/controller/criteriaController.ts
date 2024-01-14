import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addCriteria = async (req: Request, res: Response) => {
    if (req.body.content) {
        await prisma.criteria.create({
            data: {
                content: req.body.content.toString()
            }
        });
        res.end();
    } else {
        res.status(400).send('parameter missing');
    }
}

const assignCriteria= async (req: Request, res: Response) => {
    if (!isNaN(Number(req.body.criteriaId)) && req.body.datasetName) {
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
            await prisma.criteria.update({
                where: {
                    id: Number(req.body.criteriaId)
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

const unassignCriteria = async (req: Request, res: Response) => {
    if (!isNaN(Number(req.body.criteriaId)) && req.body.datasetName) {
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
            await prisma.criteria.update({
                where: {
                    id: Number(req.body.criteriaId)
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

const getCriteria = async (req: Request, res: Response) => {
    const criteria = await prisma.criteria.findMany();
    res.send(criteria);
}

const getCriterion = async (req: Request, res: Response) => {
    if (!isNaN(Number(req.params.criteriaId))) {
        const criteria = await prisma.criteria.findUnique({
            where: {
                id: Number(req.params.criteriaId)
            }
        });
        res.send(criteria);
    } else {
        res.status(400).end();
    }
}

module.exports = {
    addCriteria,
    assignCriteria,
    unassignCriteria,
    getCriteria,
    getCriterion
}