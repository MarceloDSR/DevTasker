import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import bcrypt from "bcryptjs";


@Entity()
export class {

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

    constructor(name: string, email: string, password: string, dataDeCriacao: Date){
        this.name = name
        this.email = email
        this.password = password
        this.dataDeCriacao = dataDeCriacao

    }
  
}