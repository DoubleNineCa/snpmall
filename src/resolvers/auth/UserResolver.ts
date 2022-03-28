import argon2 from "argon2";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../types";
import { RegisterUserInput } from "./RegisterUserInput";
import { UserResponse } from "./UserResponse";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    // you are not logged in
    if (!req.session.userId) {
      return undefined;
    }

    return await User.findOne(req.session.userId);
  }
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async getUser(
    @Arg("userId", () => Int) userId: number
  ): Promise<User | undefined> {
    return await User.findOne(userId);
  }

  @Mutation(() => UserResponse)
  async registerWithPassword(
    @Arg("options") options: RegisterUserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2"
          }
        ]
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2"
          }
        ]
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const _user = User.create({
      username: options.username,
      email: options.email,
      password: hashedPassword
    });

    let user;
    try {
      user = await User.save(_user);
      req.session.userId = user.id;
    } catch (err) {
      if (err.code === "23505" && err.detail.includes("username"))
        return {
          errors: [
            {
              field: "username",
              message: "username already taken"
            }
          ]
        };
      if (err.code === "23505" && err.detail.includes("email"))
        return {
          errors: [
            {
              field: "email",
              message: "email already taken"
            }
          ]
        };
    }

    return { user };
  }

  @Mutation(() => Boolean)
  async updatePassword(
    @Arg("userId", () => Int) userId: number,
    @Arg("password") password: string
  ): Promise<Boolean> {
    const user = await User.findOne(userId);
    if (!user) {
      return false;
    }
    await User.update(userId, { password });

    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("userId", () => Int) userId: number,
    @Arg("password") password: string
  ): Promise<Boolean> {
    const user = await User.findOne(userId);
    
    if (!user) {
      return false;
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return false;
    }
    await User.delete(userId);
    return true;
  }
}
