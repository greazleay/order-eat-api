import "reflect-metadata";
import app from "@src/app";
import { AppDataSource } from "@src/data-source";
import { PORT } from "@src/config";

AppDataSource.initialize().then(async () => {

    app.listen(PORT);
    console.log(`Server has started on port ${PORT}`);

}).catch(error => console.error(error));