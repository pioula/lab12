import { get_db_postgres } from "./database.js";
import { init_func } from "./init_db.js";


get_db_postgres().then(async db => {
    await init_func(db);
})