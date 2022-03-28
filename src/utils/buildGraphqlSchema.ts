import { buildSchemaSync } from "type-graphql";
import { UserResolver } from "../resolvers/auth/UserResolver";
import { AuthResolver } from "../resolvers/auth/AuthResolver";

export default () =>
  buildSchemaSync({
    resolvers: [UserResolver, AuthResolver]
  });
