import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class UserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class UserRegisterInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;

    @Field()
    confirmPassword: string;

    @Field()
    username: string;
}
