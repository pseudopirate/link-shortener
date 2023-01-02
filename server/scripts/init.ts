import { createTables, closeConnection } from "../db";

function create() {
    const raw = createTables();
    closeConnection()
    console.log('Database created ', raw);

}

create();