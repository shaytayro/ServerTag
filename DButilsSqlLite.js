const sqlite3 = require('sqlite3').verbose()
var db
getSqlConnection()
function getSqlConnection() {
    return new Promise(function(resolve) {
        this.db = new sqlite3.Database("./TagDB.db",
            function(err) {
                if(err) reject("Open error: "+ err.message)
                else    resolve("./TagDB.db" + " opened")
            }
        )
    })
}

function querySql (query) {
    return new Promise(function(resolve, reject) {
        this.db.run(query, function(err)  {
                if(err) {
                    reject(err.message);
                }

                else {
                    resolve(true);
                }

            })
    })
}

function querySql2(query, params) {
    return new Promise(function(resolve, reject) {
        if(params == undefined) params=[]
        this.db.all(query, params, function(err, rows)  {
            if(err) {
                reject("Read error: " + err.message);
            }
            else {
                resolve(rows);
            }
        })
    })
}

module.exports = {
    getSqlConnection : getSqlConnection,
    execQuery : querySql,
    execSelectQuery:querySql2
};
