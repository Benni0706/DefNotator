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
    if (req.query.criteriaId && req.query.definitionId && req.query.datasetName && req.query.applies) {
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
                        applies: Boolean(req.query.applies)
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

module.exports = router;