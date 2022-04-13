export const provideMongoDbConfig = () => ({
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    hostname: process.env.MONGODB_HOSTNAME,
    port: process.env.MONGODB_PORT,
    dbName: process.env.MONGODB_DBNAME
});