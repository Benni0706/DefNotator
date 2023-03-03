import { Application, Request, Response } from "express";

module.exports = function (app: Application) {

    app.get('/test', function (req, res) {
        res.send('Guten Tag, API am H�rer. Wie kann ich Ihnen weiterhelfen?');
    });

}