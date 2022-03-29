import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "@src/app";
import { PORT } from "@src/config";

createConnection().then(async connection => {

    app.listen(PORT);
    console.log("Server has started on port 3000");

}).catch(error => console.log(error));