import { Application} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports = function (app: Application) {

    app.get('/test/get', async (req, res) => {
        let testdata = await prisma.test.findMany();
        res.send(testdata);
    });

    app.get('/test/insert', async (req, res) => {
        let test = await prisma.test.create({
            data: {
                testtext: 'Dies ist ein Test',
            },
        });
        res.end();
    });

}