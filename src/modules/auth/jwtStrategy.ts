import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/modules/auth/auth.service";
import { UserInput } from "src/modules/user/dto/user.input";
import { UserDto } from "src/modules/user/dto/user.dto";

require("dotenv").config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET,
        });
    }
    async validate(payload: any): Promise<UserDto> {
        if (!payload.username || !payload.sub) {
            throw new UnauthorizedException();
        }

        return {
            username: payload.username,
            id: payload.sub,
        };
    }
}
