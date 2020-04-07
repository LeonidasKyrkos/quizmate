import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, ID } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { AuthService } from "src/modules/auth/auth.service";
import { GqlAuthGuard } from "src/decorators/gqlAuthGuard";

// const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly UserService: UserService,
        private readonly AuthService: AuthService
    ) {}

    // @Query(returns => [User])
    // @UseGuards(GqlAuthGuard)
    // async allUsers(): Promise<User[]> {
    //     const quizzes = await this.UserService.findAll();

    //     if (!quizzes) {
    //         throw new NotFoundException();
    //     }

    //     return quizzes;
    // }

    @Mutation(returns => ID)
    async registerUser(
        @Args("email") email: string,
        @Args("password") password: string
    ): Promise<string> {
        return await this.AuthService.register({ email, password });
    }
}
