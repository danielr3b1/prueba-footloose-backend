import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "modelos" })
export class Modelo {

    @PrimaryGeneratedColumn("increment")
    idModelo: number;

    @Column()
    nombreModelo: string;
    
    @Column({default: true})
    isActive: boolean;

}
