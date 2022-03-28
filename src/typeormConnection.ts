import { createConnection, getConnectionOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import path from "path";

export default async () => {
  const env = process.env.NODE_ENV;
  
  const config = await getConnectionOptions(env);
  
  return env === "production"
    ? createConnection({
        ...config,
        url: process.env.DATABASE_URL,
        name: "default",
        entities: [path.join(__dirname, "./entities/**/*.ts")],
        migrations: [path.join(__dirname, "./migrations/*")]
      } as PostgresConnectionOptions)
    : createConnection({ ...config, name: "default" });
};
