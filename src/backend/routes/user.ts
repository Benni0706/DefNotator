import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { randomBytes, pbkdf2Sync } from "crypto";

const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/add', async (req: Request, res: Response) => {
    if (req.query.name && req.query.password && req.query.email) {
        const token: string = randomBytes(256).toString('hex');
        const salt = randomBytes(16).toString('hex');
        const passwordHash = pbkdf2Sync(req.query.password.toString(), salt, 1000, 64, `sha512`).toString(`hex`);
        const newuser = await prisma.user.create({
            data: {
                name: req.query.name.toString(),
                email: req.query.email.toString(),
                password: passwordHash,
                salt: salt,
                sessionToken: token,
            },
        });
        res.cookie('sessionToken', newuser.sessionToken);
        res.end();
    } else {
        res.send('parameter missing');
    }
});

router.post('/login', async (req: Request, res: Response) => {
    if (req.query.name && req.query.password) {
        const user = await prisma.user.findUnique({
            where: {
                name: req.query.name.toString()
            },
        });
        if (user) {
            let passwordHash = pbkdf2Sync(req.query.password.toString(), user.salt, 1000, 64, `sha512`).toString(`hex`);
            if (passwordHash === user.password) {
                res.cookie('sessionToken', user.sessionToken);
                res.end();
            } else {
                res.status(401).end();
            }
        } else {
            res.status(404).send('User not found')
        }
    } else {
        res.send('parameter missing');
    }
});

//authentification missing !!!IMPORTANT!!!
router.get('/:username/datasets', async (req: Request, res: Response) => {
    if (req.params.username) {
        const datasets = await prisma.user.findUnique({
            where: {
                name: req.params.username,
            },
            select: {
                datasets: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.send(datasets);
    } else {
        res.send('username parameter missing');
    }
});

//authentification missing !!!IMPORTANT!!!
router.delete('/:username', async (req: Request, res: Response) => {
    if (req.params.username) {
        try{
            await prisma.user.delete({
                where: {
                    name: req.params.username,
                },
            });
            res.end();
        } catch {
            res.status(404).send('user not found');
        }
    } else {
        res.send('username parameter missing');
    }
});

module.exports = router;