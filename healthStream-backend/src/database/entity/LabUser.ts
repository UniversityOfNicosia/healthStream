import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {  UserDocType } from "../common/enums";
import {Laboratory } from "./Laboratory";

@Entity()
export class LabUser{
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    userName: string
    
    @Column()
    userLastName: string

    @Column()
    userFirstName: string

    @Column({type: 'enum', enum: UserDocType})
    userDocType: UserDocType

    @Column()
    userDocId: string
     
    @OneToOne(() => Laboratory, (laboratory) => laboratory.id, {lazy: true, cascade: true})
    @JoinColumn()
    public laboratory: Promise<Laboratory>
  
    @Column({nullable: true})
    public laboratoryId: number

}