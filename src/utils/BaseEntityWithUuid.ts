import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ColumnOptions,
  BeforeInsert
} from "typeorm";
import { v4 } from "uuid";
import { Field, ObjectType, Int } from "type-graphql";

const dateType: ColumnOptions = {
  type: process.env.NODE_ENV === "test" ? "datetime" : "timestamp",
  default: () => "CURRENT_TIMESTAMP"
};

@ObjectType()
@Entity()
export class BaseEntityWithUuid extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column()
  uuid: string;

  @Field()
  @CreateDateColumn(dateType)
  createdAt: Date;

  @Field()
  @UpdateDateColumn(dateType)
  updatedAt: Date;

  @BeforeInsert()
  private beforeInsert() {
    this.uuid = v4();
  }
}
