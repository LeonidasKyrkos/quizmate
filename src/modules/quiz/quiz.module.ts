import { Module } from "@nestjs/common";
import { QuizResolver } from "./quiz.resolver";
import { QuizService } from "./quiz.service";
import { QuizEntity } from "./entities/quiz.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/modules/auth/auth.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizEntity]),
        AuthModule,
        PassportModule,
    ],
    providers: [QuizResolver, QuizService],
})
export class QuizModule {}
