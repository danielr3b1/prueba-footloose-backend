import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt"
import { Role } from "src/roles/entities/role.entity";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string

    @Column()
    lastname: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ nullable: true })
    photo: string

    @Column({ default: true })
    isActive: boolean

    @Column({ default: true })
    isDelete: boolean

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @JoinTable({
        name: "user_roles",
        joinColumn: {
            name: "id_user"
        },
        inverseJoinColumn: {
            name: "id_rol"
        }
    })
    @ManyToMany(() => Role, (rol) => rol.users)
    roles: Role[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT))
    }

}
