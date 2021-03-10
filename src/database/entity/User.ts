import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn() 
    id: number

    @Column({nullable: true})
    userName: string

    @Column()
    firstName: string

    @Column({nullable: true})
    lastName: string 

    @Column({unique: true})
    public email: string

    @Column({default: true})
    public enabled: boolean
  
    @Column({type:'timestamp', nullable: true})
    public lastAccessAt?: Date
}