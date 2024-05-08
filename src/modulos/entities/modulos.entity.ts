import { Permiso } from "src/permisos/entities/permiso.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "modulos" })
export class Modulo {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string

    @Column()
    header: number

    @Column()
    position: number

    @Column()
    ruta: string

    @Column()
    icon: string

    @Column({ default: true })
    check: boolean

    @OneToMany(() => Permiso, permiso => permiso.modulo)
    permisos: Permiso[];


}
