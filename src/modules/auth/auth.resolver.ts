import { NotFoundException, UseGuards, ExecutionContext } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, ID, Context } from "@nestjs/graphql";
import { AuthService } from "src/modules/auth/auth.service";
import { GqlAuthGuard } from "src/decorators/gqlAuthGuard";
import { GqlExecutionContext } from "@nestjs/graphql";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(returns => ID)
    async login(
        @Args("email") email: string,
        @Args("password") password: string,
        @Context() context: any
    ): Promise<string> {
        const token = await this.authService.login({ email, password });

        context.res.cookie("quizmate_token", token, { httpOnly: true });

        return token;
    }
}
