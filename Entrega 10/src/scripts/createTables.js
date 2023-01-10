const { options } = require("../config/databaseConfig")
const knex = require("knex")

//crear instancia de la base de datos de mysql
const databaseMariadb = knex(options.mariaDB);
//crear instancia de la base de datos de sqlite
const databaseSqlite = knex(options.sqliteDB);

const createTables = async()=>{
    try {
        //....MariaDB
        let productosTable = await databaseMariadb.schema.hasTable("productos");
        if(productosTable){
            await databaseMariadb.schema.dropTable("productos");
        }
        await databaseMariadb.schema.createTable("productos",table=>{
            table.increments("id");
            table.string("name",40).nullable(false);
            table.integer("price").nullable(false);
            table.string("thumbnail",200).nullable(false);
        });
        console.log("Tabla productos creada en MariaDB");

        //....SQLite
        let chatTable = await databaseSqlite.schema.hasTable("chat");
        if(chatTable){
            await databaseSqlite.schema.dropTable("chat");
        }
        await databaseSqlite.schema.createTable("chat", table=>{
            table.increments("id");
            table.string("author",30);
            table.string("date", 20);
            table.string("message",200);
        });
        console.log("Tabla chat creada en SQLite");
    } catch (error) {
        console.log(error)
    }
    databaseMariadb.destroy();
    databaseSqlite.destroy();
}
createTables();