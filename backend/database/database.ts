var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./database/db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err: Error) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    }else{
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE test (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                testtext text
            )`
            , (err: Error) => {
                if (err) {
                    //table already exists
                } else {
                    //table just created, inserting some test data
                    db.run("INSERT INTO test (testtext) VALUES ('hey')");
                    db.run("INSERT INTO test (testtext) VALUES ('guten tag')");
                }
            });
    }
});

//functions to be used to communicate with database
//exported as modules, can be imported to be used in the project
module.exports = {
    getTests: function(callback: any) {
        db.all("SELECT * FROM test", function(err: Error, rows: any) {
            callback(rows);
        });
    }
}