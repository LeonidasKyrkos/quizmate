import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { QuizModule } from "./modules/quiz/quiz.module";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/user/user.module";

import { Question } from "src/modules/quiz/entities/question.entity";
import { User } from "src/modules/user/user.entity";
import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Answer } from "src/modules/quiz/entities/answer.entity";

require("dotenv").config();

@Module({
    imports: [
        QuizModule,
        AuthModule,
        UsersModule,
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: "schema.gql",
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "postgres",
            port: 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_NAME,
            entities: [Question, User, Quiz, Answer],
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
