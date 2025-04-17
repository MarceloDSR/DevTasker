import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { TarefaModel } from "./TarefaModel";


@Entity()
export class UsuariosModel {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

    @Column({ type: "timestamp" })
    dataDeCriacao!: Date

    @OneToMany(() => TarefaModel, (tarefa: { userId: any; }) => tarefa.userId)
    usuarioModel!: string;

    constructor(name: string, email: string, password: string) {
        this.name = name
        this.email = email
        this.password = password
    }
}