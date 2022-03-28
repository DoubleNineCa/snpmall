module.exports = [
  {
    name: "dev",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "snpmall",
    synchronize: false,
    debug: true,
    logging: true,
    entities: ["dist/entities/**/*.js"],
    migrations: ["dist/migrations/**/*.js"],
    subscribers: ["dist/subscribers/**/*.js"],
    cli: {
      entitiesDir: "src/entitites",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers"
    }
  },
  {
    name: "test",
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: ["dist/entities/**/*.js"],
    synchronize: true,
    logging: false
  },
  {
    name: "production",
    type: "postgres",
    synchronize: false,
    logging: false,
    entities: ["dist/entities/**/*.*"],
    migrations: ["dist/migration/**/*.*"],
    subscribers: ["dist/subscriber/**/*.*"]
  }
];
