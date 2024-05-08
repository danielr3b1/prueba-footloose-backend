import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "marcas" })
export class Marca {

    @PrimaryGeneratedColumn("increment")
    idMarca: number

    @Column()
    nombreMarca: string

    @Column({ default: true })
    isActive: boolean

}
