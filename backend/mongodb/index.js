import mongoose from "mongoose";

import { provideMongoDbConfig } from "../configs/mongodb.js";

export const initMongoDb = async () => {
    const config = provideMongoDbConfig();
    const uri = `mongodb://${config.user}:${config.password}@${config.hostname}:${config.port}/${config.dbName}`;

    console.log("Connecting to mongoDb with URI: " + uri);
    await mongoose.connect(uri)
        .then(() => console.log("MongoDB database connection established successfully."));
};
