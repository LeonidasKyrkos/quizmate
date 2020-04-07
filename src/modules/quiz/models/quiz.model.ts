import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Quiz {
    @Field(type => ID)
    id: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    userId: string;
}
