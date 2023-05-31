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
        await prisma.definition.create({
            data: {
                content: req.query.content.toString()
            }
        });
        res.end();
    } else {
        res.status(400).send('parameter missing');
    }
});

router.post('/assign', async (req: Request, res: Response) => {
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
});

router.post('/unassign', async (req: Request, res: Response) => {
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
});

router.get('/all', async (req: Request, res: Response) => {
    const definitions = await prisma.definition.findMany();
    res.send(definitions);
});

router.get('/:definitionId', async (req: Request, res: Response) => {
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
});

/*
which users should be able to delete which definitions??? for now its just impossible to delete definitions
router.delete('/:definitionId', async (req: Request, res: Response) => {
    if (!isNaN(Number(req.params.definitionId))) {
        const definition = await prisma.definition.findUnique({
            where: {
                id: Number(req.params.definitionId)
            }
        });
        if (definition) {
            await prisma.definition.delete({
                where: {
                    id: Number(req.params.definitionId)
                }
            });
            res.end();
        } else {
            res.status(404).send('definition not found');
        }
    } else {
        res.status(400).end();
    }
});
*/

module.exports = router;