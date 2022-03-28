import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entities/User";
import { RegisterUserInput } from "./RegisterUserInput";
import argon2 from "argon2";
import { UserResponse } from "./UserResponse";
import { MyContext } from "../../types";

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "invalid login request"
          }
        ]
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "invalid login rerquest"
          }
        ]
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise(resolve => {
      req.session.destroy(err => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
