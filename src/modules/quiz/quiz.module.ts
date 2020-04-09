import { Module } from "@nestjs/common";
import { QuizResolver } from "./quiz.resolver";
import { QuizService } from "./quiz.service";
import { Quiz } from "./entities/quiz.entity";
import { Question } from "./entities/question.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/modules/auth/auth.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz, Question]),
        AuthModule,
        PassportModule,
    ],
    providers: [QuizResolver, QuizService],
})
export class QuizModule {}
