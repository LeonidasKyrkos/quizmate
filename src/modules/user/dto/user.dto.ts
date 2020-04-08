import { Field, ObjectType, ID } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class UserDto {
    @Field()
    username: string;

    @Field(type => ID)
    id: string;
}
