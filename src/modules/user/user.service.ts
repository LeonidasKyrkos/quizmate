import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { User } from "src/modules/user/models/user.model";
import { UserInput } from "src/modules/user/dto/user.input";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private UserRepository: Repository<UserEntity>
    ) {}

    findAll(): Promise<UserEntity[]> {
        return this.UserRepository.find();
    }

    findOne(id: string): Promise<UserEntity> {
        return this.UserRepository.findOne(id);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.UserRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    async findById(id: number): Promise<UserEntity> {
        return await this.UserRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    async remove(id: string): Promise<void> {
        await this.UserRepository.delete(id);
    }

    async register(user: UserInput): Promise<User> {
        const saltyPass = await bcrypt.hash(user.password, 10);

        const newUser = new UserEntity();

        Object.assign(newUser, {
            email: user.email,
            password: saltyPass,
        });

        try {
            return await this.UserRepository.save(newUser);
        } catch (err) {
            throw err.message;
        }
    }
}
