import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import bcrypt from "bcryptjs";
import { TarefaModel } from "./TarefaModel";
import { TarefaRepository } from "../repositories/TarefaRepository";


@Entity()
export class UsuariosModel{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar", length: 100, nullable: false })
    name: string;
  
    @Column({type:"varchar", length: 255, unique: true })
    email: string;
  
    @Column({type:"varchar", length:255, nullable: false})
    password: string;

    @Column({type: "date"})
    dataDeCriacao: Date

    @OneToMany(() => TarefaModel, (tarefa) => tarefa.userId)
    usuarioModel!:string;

    constructor(name: string, email: string, password: string, dataDeCriacao: Date){
        this.name = name
        this.email = email
        this.password = password
        this.dataDeCriacao = dataDeCriacao

    }
  
}