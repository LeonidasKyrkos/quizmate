import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { NewQuizInput } from "./dto/new-quiz.input";
import { Quiz } from "./models/quiz.model";
import { QuizService } from "./quiz.service";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { GqlAuthGuard } from "src/decorators/gqlAuthGuard";
import { User } from "src/modules/user/models/user.model";

const pubSub = new PubSub();

@Resolver(of => Quiz)
export class QuizResolver {
    constructor(private readonly quizService: QuizService) {}

    @Query(returns => Quiz)
    async quiz(@Args("id") id: string): Promise<Quiz> {
        const quiz = await this.quizService.getQuizById(id);
        if (!quiz) {
            throw new NotFoundException(id);
        }
        return quiz;
    }

    @Query(returns => [Quiz])
    allQuizzes(): Promise<Quiz[]> {
        return this.quizService.allQuizzes();
    }

    @Query(returns => [Quiz])
    @UseGuards(GqlAuthGuard)
    async userQuizzes(@CurrentUser() user: User): Promise<Quiz[]> {
        return await this.quizService.getUsersQuizbank(user.id);
    }

    @Mutation(returns => Quiz)
    @UseGuards(GqlAuthGuard)
    async addQuiz(
        @Args("newQuizData") newQuizData: NewQuizInput,
        @CurrentUser() user: User
    ): Promise<Quiz> {
        const quiz = await this.quizService.createQuiz(newQuizData, user);

        return quiz;
    }

    @Mutation(returns => Boolean)
    @UseGuards(GqlAuthGuard)
    async removeQuiz(@Args("id") id: string, @CurrentUser() user: User) {
        return await this.quizService.removeQuiz(id, user.id);
    }

    @Subscription(returns => Quiz)
    quizAdded() {
        // return pubSub.asyncIterator("quizAdded");
    }
}
