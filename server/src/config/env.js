import "dotenv/config";

export const config = {
    NODE_ENV: "development",
    PORT: Number(process.env.PORT),
    PG_PORT: Number(process.env.PGPORT),
    PG_HOST: process.env.PGHOST,
    PG_DATABASE: process.env.PGDATABASE,
    PG_USER: process.env.PGUSER,
    PG_PASSWORD: process.env.PGPASSWORD
}