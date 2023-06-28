import { Request, Response, response } from "express";
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
    if (Number(req.query.criteriaId) && Number(req.query.definitionId) && req.query.datasetName && req.query.applies) {
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
            const annotation = await prisma.annotation.count({
                where: {
                    criteria: {
                        id: Number(req.query.criteriaId)
                    },
                    definition: {
                        id: Number(req.query.definitionId)
                    },
                    dataset: {
                        name: req.query.datasetName.toString()
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
                                id: Number(req.query.criteriaId)
                            }
                        },
                        definition: {
                            connect: {
                                id: Number(req.query.definitionId)
                            }
                        },
                        dataset: {
                            connect: {
                                name: req.query.datasetName.toString()
                            }
                        },
                        user: {
                            connect: {
                                id: res.locals.userId
                            }
                        },
                        applies: req.query.applies === 'true' ? true : false
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
});

router.post('/update', async (req: Request, res: Response) => {
    if (Number(req.query.annotationId) && req.query.applies) {
        const access = await prisma.annotation.findFirst({
            where: {
                id: Number(req.query.annotationId),
                user: {
                    id: res.locals.userId
                }
            }
        });
        if (access) {
            const annotation = await prisma.annotation.update({
                where: {
                    id: Number(req.query.annotationId)
                },
                data: {
                    applies: req.query.applies === 'true' ? true : false
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
});

router.get('/:annotationId', async (req: Request, res: Response) => {
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
});

module.exports = router;