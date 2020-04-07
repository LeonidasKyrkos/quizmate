import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata";

const helmet = require("helmet");
const cookieParser = require("cookie-parser");

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.use(helmet());

    await app.listen(3000);
}
bootstrap();
