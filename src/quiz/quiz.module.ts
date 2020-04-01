import { Module } from "@nestjs/common";
import { DateScalar } from "../common/scalars/date.scalar";
import { QuizResolver } from "./quiz.resolver";
import { QuizService } from "./quiz.service";

@Module({
    providers: [QuizResolver, QuizService, DateScalar],
})
export class QuizModule {}
