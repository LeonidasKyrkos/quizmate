import { Injectable } from "@nestjs/common";
import { NewQuizInput } from "./dto/new-quiz.input";
import { Quiz } from "./models/quiz.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizEntity } from "./entities/quiz.entity";
import { UserDto } from "src/modules/user/dto/user.dto";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(QuizEntity)
        private QuizRepository: Repository<QuizEntity>
    ) {}

    async createQuiz(data: NewQuizInput, user: UserDto): Promise<Quiz> {
        const newQuiz = new QuizEntity();

        Object.assign(newQuiz, {
            title: data.title,
            description: data.description,
            userId: user.id,
        });

        try {
            return await this.QuizRepository.save(newQuiz);
        } catch (err) {
            throw err.message;
        }
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
