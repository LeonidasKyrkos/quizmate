import { Injectable } from "@nestjs/common";
import { NewQuizInput } from "./dto/new-quiz.input";
import { Quiz } from "./models/quiz.model";
// import { Question } from "./models/question.model";

@Injectable()
export class QuizService {
    /**
     * MOCK
     * Put some real business logic here
     * Left for demonstration purposes
     */

    async createQuiz(data: NewQuizInput): Promise<Quiz> {
        return {} as any;
    }

    async getQuizById(id: string): Promise<Quiz> {
        return {} as any;
    }

    async allQuizzes(): Promise<Quiz[]> {
        return [] as Quiz[];
    }

    async getUsersQuizbank(user: string): Promise<Quiz[]> {
        return [] as Quiz[];
    }

    async removeQuiz(id: string): Promise<boolean> {
        return true;
    }
}
