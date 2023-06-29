import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addDataset = async (req: Request, res: Response) => {
    if (req.query.name) {
        const existingDataset = await prisma.dataset.findUnique({
            where: {
                name: req.query.name.toString()
            }
        });
        if (!existingDataset) {
            const newDataset = await prisma.dataset.create({
                data: {
                    name: req.query.name.toString(),
                    access: {
                        create: [
                            {
                                user: {
                                    connect: {
                                        id: res.locals.userId
                                    }
                                },
                                role: "OWNER"
                            }
                        ]
                    }
                }
            });
            res.end();
        } else {
            res.send('please pick another name');
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

const getDefinitionsFromDataset = async (req: Request, res: Response) => {
    if (req.params.datasetName) {
        const definitions = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                dataset: {
                    name: req.params.datasetName
                }
            },
            select: {
                dataset: {
                    select: {
                        definitions: {
                            select: {
                                content: true
                            }
                        }
                    }
                }
            }
        });
        res.send(definitions?.dataset.definitions);
    } else {
        res.status(400).send('parameter missing');
    }
}

const getCriteriaFromDataset = async (req: Request, res: Response) => {
    if (req.params.datasetName) {
        const criteria = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                dataset: {
                    name: req.params.datasetName
                }
            },
            select: {
                dataset: {
                    select: {
                        criteria: {
                            select: {
                                content: true
                            }
                        }
                    }
                }
            }
        });
        res.send(criteria?.dataset.criteria);
    } else {
        res.status(400).send('parameter missing');
    }
}

const deleteDataset = async (req: Request, res: Response) => {
    if (req.params.datasetName) {
        const access = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                dataset: {
                    name: req.params.datasetName
                }
            }
        });
        if (access) {
            await prisma.dataset.delete({
                where: {
                    name: req.params.datasetName
                }
            });
            res.end();
        } else {
            res.status(404).send('dataset not found');
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

const getUserFromDataset = async (req: Request, res: Response) => {
    if (req.params.datasetName) {
        const access = await prisma.access.findFirst({
            where: {
                user: {
                    id: res.locals.userId
                },
                dataset: {
                    name: req.params.datasetName
                }
            }
        });
        if (access) {
            const user = await prisma.access.findMany({
                where: {
                    dataset: {
                        name: req.params.datasetName
                    }
                },
                select: {
                    role: true,
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            res.send(user);
        } else {
            res.status(401).end();
        }
    } else {
        res.status(400).send('parameter missing');
    }
}

module.exports = {
    addDataset,
    getDefinitionsFromDataset,
    getCriteriaFromDataset,
    deleteDataset,
    getUserFromDataset
}