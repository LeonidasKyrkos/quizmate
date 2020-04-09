import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { NewQuizInput } from "./dto/new-quiz.input";
import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { QuizService } from "./quiz.service";
import { NewQuestionInput } from "src/modules/quiz/dto/new-question.input";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { GqlAuthGuard } from "src/decorators/gqlAuthGuard";
import { User } from "src/modules/user/models/user.model";
import { Question } from "src/modules/quiz/entities/question.entity";

const pubSub = new PubSub();

@Resolver(of => Quiz)
export class QuizResolver {
    constructor(private readonly quizService: QuizService) {}

    @Query(returns => Quiz)
    @UseGuards(GqlAuthGuard)
    async quiz(@Args("id") id: string): Promise<Quiz> {
        const quiz = await this.quizService.getQuizById(id);
        if (!quiz) {
            throw new NotFoundException(id);
        }
        return quiz;
    }

    @Query(returns => [Quiz])
    @UseGuards(GqlAuthGuard)
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
    async removeQuiz(
        @Args("id") id: string,
        @CurrentUser() user: User
    ): Promise<boolean> {
        return await this.quizService.removeQuiz(id, user.id);
    }

    @Subscription(returns => Quiz)
    quizAdded() {
        // return pubSub.asyncIterator("quizAdded");
    }

    @Mutation(returns => Question)
    @UseGuards(GqlAuthGuard)
    async addQuestion(
        @Args("question") question: string,
        @Args("quiz") quiz: string,
        @CurrentUser() user: User
    ) {
        return await this.quizService.addQuestion(question, user.id, quiz);
    }

    @Query(returns => [Question])
    @UseGuards(GqlAuthGuard)
    async getQuizQuestions(
        @Args("quizId") quizId: string
    ): Promise<Question[]> {
        const resp = await this.quizService.getQuestions(quizId);

        return resp;
    }
}
