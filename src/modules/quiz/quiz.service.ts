import { Injectable } from "@nestjs/common";
import { NewQuizInput } from "./dto/new-quiz.input";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "./entities/quiz.entity";
import { UserDto } from "src/modules/user/dto/user.dto";
import { Question } from "src/modules/quiz/entities/question.entity";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private QuizRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private QuestionRepository: Repository<Question>
    ) {}

    async createQuiz(data: NewQuizInput, user: UserDto): Promise<Quiz> {
        const newQuiz = new Quiz();

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
        const quiz = await this.QuizRepository.findOne({ id });
        const questions = await this.QuestionRepository.find({ quiz: quiz });

        return {
            ...quiz,
            questions,
        };
    }

    async allQuizzes(): Promise<Quiz[]> {
        return await this.QuizRepository.find();
    }

    async getUsersQuizbank(user: string): Promise<Quiz[]> {
        return await this.QuizRepository.find({ userId: user });
    }

    async removeQuiz(id: string, userId: string): Promise<boolean> {
        const quiz = await this.QuizRepository.find({ id, userId });

        await this.QuizRepository.remove(quiz);

        return true;
    }

    async addQuestion(
        question: string,
        userId: string,
        quizId: string
    ): Promise<Question> {
        const newQuestion = new Question();
        const quiz = await this.getQuizById(quizId);

        Object.assign(newQuestion, {
            question,
            quiz,
            userId,
        });

        try {
            const question = await this.QuestionRepository.save(newQuestion);

            console.log(question);

            return {
                id: "IOWD",
                question: "aodhi",
                quiz,
                multipleChoice: false,
            };
        } catch (err) {
            throw err.message;
        }
    }

    async getQuestions(quizId: string): Promise<Question[]> {
        const quiz = await this.getQuizById(quizId);

        return await this.QuestionRepository.find({ quiz });
    }
}
