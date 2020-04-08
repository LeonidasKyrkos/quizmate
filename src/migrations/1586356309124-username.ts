// import { MigrationInterface, QueryRunner } from "typeorm";

// export class username1586356309124 implements MigrationInterface {
//     public async up(queryRunner: QueryRunner): Promise<any> {
//         const allUsers = await queryRunner.query(`SELECT id FROM UserEntity`);
//         const promises = allUsers.map(async user => {
//             const username = "";

//             return await queryRunner.query(
//                 `UPDATE UserEntity SET username=${username}`
//             );
//         });
//     }

//     public async down(queryRunner: QueryRunner): Promise<any> {}
// }
