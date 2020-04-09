import { Injectable } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import { UserDto } from "src/modules/user/dto/user.dto";
import { UserRegisterInput } from "src/modules/user/dto/user.input";
import { UserInput } from "src/modules/user/dto/user.input";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async validateUser(userData: UserInput): Promise<UserDto> {
        const user = await this.userService.findByEmail(userData.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const valid = await bcrypt.compare(userData.password, user.password);

        return valid ? user : null;
    }

    public async login(userData: UserInput): Promise<string> {
        const user = await this.validateUser(userData);
        const payload = { username: user.username, sub: user.id };

        return this.jwtService.sign(payload);
    }

    public async register(userData: UserRegisterInput): Promise<string> {
        if (userData.password !== userData.confirmPassword) {
            throw "Password and PasswordConfirm do not match.";
        }

        const user = await this.userService.register(userData);

        if (!user) {
            throw "Error when registering user. Please contact support.";
        }

        return this.jwtService.sign({ username: user.username, sub: user.id });
    }
}
