import { Color } from "src/colores/entities/color.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { Modelo } from "src/modelos/entities/modelo.entity";
import { Talla } from "src/tallas/entities/talla.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "productos" })
export class Producto {

    @PrimaryGeneratedColumn("increment")
    idProducto: number

    @Column()
    nombreProducto: string

    @ManyToOne(() => Marca, (marca) => marca.idMarca, {
        eager: true, // para que traiga las marcas al hacer un findOne
    })
    @JoinColumn({ name: "idMarca" })
    marca: Marca

    @ManyToOne(() => Modelo, (modelo) => modelo.idModelo, {
        eager: true, // para que traiga las marcas al hacer un findOne
    })
    @JoinColumn({ name: "idModelo" })
    modelo: Modelo

    @ManyToOne(() => Color, (color) => color.idColor, {
        eager: true, // para que traiga las marcas al hacer un findOne
    })
    @JoinColumn({ name: "idColor" })
    color: Color

    @ManyToOne(() => Talla, (talla) => talla.idTalla, {
        eager: true, // para que traiga las marcas al hacer un findOne
    })
    @JoinColumn({ name: "idTalla" })
    talla: Talla

    @Column()
    imagen: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    precioVenta: number

    @Column({ default: true})
    isActive: boolean

}
