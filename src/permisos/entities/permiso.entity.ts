import { Modulo } from "src/modulos/entities/modulos.entity";
import { Role } from "src/roles/entities/role.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "permisos" })
export class Permiso {

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(() => Role, (rol) => rol.permisos, {
        eager: false, // para que traiga el usuario al hacer un findOne
    })
    @JoinColumn({ name: "id_rol" })
    role: Role

    @ManyToOne(() => Modulo, (modulo) => modulo.permisos, {
        eager: false, // para que traiga el usuario al hacer un findOne
    })
    @JoinColumn({ name: "id_modulo" })
    modulo: Modulo

}
