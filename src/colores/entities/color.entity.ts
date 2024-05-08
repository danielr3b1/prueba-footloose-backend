import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "colores"})
export class Color {

    @PrimaryGeneratedColumn("increment")
    idColor: number;

    @Column()
    nombreColor: string;

    @Column({default: true})
    isActive: boolean;
}
