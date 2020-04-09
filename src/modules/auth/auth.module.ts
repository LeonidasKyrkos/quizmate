import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/user/user.entity";
import { UserService } from "src/modules/user/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/modules/auth/jwtStrategy";
import { AuthResolver } from "./auth.resolver";

require("dotenv").config();

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: process.env.APP_SECRET,
            signOptions: { expiresIn: "3600s" },
        }),
    ],
    exports: [AuthService],
    providers: [AuthService, AuthResolver, UserService, JwtStrategy],
})
export class AuthModule {}
