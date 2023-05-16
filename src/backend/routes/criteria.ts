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
    if (req.query.content) {
        await prisma.criteria.create({
            data: {
                content: req.query.content.toString()
            }
        });
    } else {
        res.status(400).send('parameter missing');
    }
});

router.post('/assign', async (req: Request, res: Response) => {
    if (!isNaN(Number(req.query.criteriaId)) && req.query.datasetName) {
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
            await prisma.criteria.update({
                where: {
                    id: Number(req.query.criteriaId)
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
});

router.get('/all', async (req: Request, res: Response) => {
    const criteria = await prisma.criteria.findMany();
    res.send(criteria);
});

router.get('/:criteriaId', async (req: Request, res: Response) => {
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
});

router.delete('/:criteriaId', async (req: Request, res: Response) => {
    if (!isNaN(Number(req.params.criteriaId))) {
        const criteria = await prisma.criteria.findUnique({
            where: {
                id: Number(req.params.criteriaId)
            }
        });
        if (criteria) {
            await prisma.criteria.delete({
                where: {
                    id: Number(req.params.criteriaId)
                }
            });
            res.end();
        } else {
            res.status(404).send('criteria not found');
        }
    } else {
        res.status(400).end();
    }
});

module.exports = router;