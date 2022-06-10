import { get_db_sqlite } from "./database.js";
import { init_func } from "./init_db.js";


get_db_sqlite().then(async db => {
    await init_func(db);
})