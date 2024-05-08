import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tallas" })
export class Talla {

    @PrimaryGeneratedColumn("increment")
    idTalla: number;

    @Column()
    nombreTalla: string;

    @Column({ default: true })
    isActive: boolean

}
