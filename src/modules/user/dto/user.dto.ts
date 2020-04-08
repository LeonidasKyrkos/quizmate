import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class UserDto {
    @Field()
    username: string;

    @Field()
    id: string;
}
