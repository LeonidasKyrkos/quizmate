import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const ResGql = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const response = GqlExecutionContext.create(ctx)
            .switchToHttp()
            .getResponse();

        return response;
    }
);
