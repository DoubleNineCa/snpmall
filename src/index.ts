import "dotenv-safe/config";
import "reflect-metadata";
import app from "./app";
import typeormConnection from "./typeormConnection";

const main = async () => {
  const conn = await typeormConnection();
  if (conn) {
    conn.runMigrations();
  }

  const port = process.env.PORT || 4000;
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
  );
};

main().catch(err => {
  console.log(err);
});
