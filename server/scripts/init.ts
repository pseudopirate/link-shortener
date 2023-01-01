import { getCreateDatabaseStatement } from "../db";

function create() {
    const createDatabase = getCreateDatabaseStatement()

    const raw = createDatabase.run();

    console.log('Database created ', raw);

}

create();