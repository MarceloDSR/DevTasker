import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import bcrypt from "bcryptjs";
import { UsuariosModel } from "./UsuariosModel"; 


@Entity()
export class {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar", length: 100, nullable: false })
    titulo: string;
  
    @Column({type:"varchar", length: 255, unique: true })
    descricao: string;
  
    @Column({type:"varchar", length:255, nullable: false})
    status: string;

    @Column({type: "date"})
    dataDeEntrega: Date

   @ManyToOne(() => UsuariosModel (usuariosModel) => usuariosModel.tarefas)
    usuarioId:

    constructor(){


    }
  
}