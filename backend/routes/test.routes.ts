import { Application} from "express";
const {getTests} = require("../database/database");

module.exports = function (app: Application) {

    app.get('/test', function (req, res) {
        getTests(function(rows: any) {
            res.send(rows);
        })
    });

}