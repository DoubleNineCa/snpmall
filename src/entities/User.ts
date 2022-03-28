import { Entity, Column } from "typeorm";
import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntityWithUuid {
  @Field()
  @Column({ type: "text", unique: true })
  username!: string;

  @Field()
  @Column({ type: "text", unique: true })
  email!: string;

  @Field()
  @Column()
  password!: string;
}
