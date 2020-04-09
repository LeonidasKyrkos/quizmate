import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserResolver } from "./user.resolver";
import { User } from "./user.entity";
// import { JwtModule } from "@nestjs/jwt";
// import { Strategy } from "passport-jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule, PassportModule],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UsersModule {}
