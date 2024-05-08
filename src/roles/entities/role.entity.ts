import { Modulo } from "src/modulos/entities/modulos.entity";
import { Permiso } from "src/permisos/entities/permiso.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "roles" })
export class Role {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ nullable: false })
    nombre: string

    @Column({ default: true })
    isActive: boolean

    @Column({ default: true })
    estado: boolean

    @ManyToMany(() => User, (user) => user.roles)
    users: User[]

    @OneToMany(() => Permiso, (permiso) => permiso.role)
    permisos: Permiso[]

    /* @JoinTable({
        name: "rol_modulos",
        joinColumn: {
            name: "id_rol"
        },
        inverseJoinColumn: {
            name: "id_modulo"
        }
    })
    @ManyToMany(() => Modulo, (modulo) => modulo.rol)
    modulo: Modulo[] */
}   
