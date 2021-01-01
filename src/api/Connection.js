/**
 * @file Connection.js
 */
const { createConnection } = require('mysql');
class MySQL {

    constructor(host, user, password) {
        this.host = host;
        this.user = user;
        this.password = password;
    }

    connect(databaseName) {
        const con = createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: databaseName
        });
        con.connect(err =>{
            if(err) return console.log(err);
            console.log('MySQL - Connected')

        })
        return con;
    }
}
module.exports = { MySQL }