import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { QuizModule } from "./quiz/quiz.module";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
    imports: [
        QuizModule,
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: "schema.gql",
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
