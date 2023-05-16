import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { getUserId } from '../modules/sessionTokenMiddleware';

const cookieParser = require('cookie-parser');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', async (req: Request, res: Response) => {
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
});

router.get('/:datasetName/definitions', async (req: Request, res: Response) => {
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
});

router.get('/:datasetName/criteria', async (req: Request, res: Response) => {
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
});

router.delete('/:datasetName', async (req: Request, res: Response) => {
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
});

module.exports = router;