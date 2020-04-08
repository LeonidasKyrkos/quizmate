import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, ID } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { AuthService } from "src/modules/auth/auth.service";
import { GqlAuthGuard } from "src/decorators/gqlAuthGuard";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { User } from "src/modules/user/models/user.model";

// const pubSub = new PubSub();

@Resolver(of => UserDto)
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
        @Args("password") password: string,
        @Args("confirmPassword") confirmPassword: string,
        @Args("username") username: string
    ): Promise<string> {
        return await this.AuthService.register({
            email,
            password,
            confirmPassword,
            username,
        });
    }

    @Query(returns => UserDto)
    @UseGuards(GqlAuthGuard)
    async getUser(@CurrentUser() user: User): Promise<UserDto> {
        return await this.UserService.findById(user.id);
    }
}
