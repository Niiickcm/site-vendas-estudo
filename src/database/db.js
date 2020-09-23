//importando a dependecia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operaçoes no banco de dandos
const db = new sqlite3.Database("src/database/database.db")

module.exports  = db
//utilizar o objeto do banco de dados para nossas operaçoes
db.serialize(()=> {
    //criar uma tabela
    db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         image TEXT,
         title  TEXT,
         description TEXT,
         value TEXT,
         value_times TEXT
    );
 `)
    
})