


  
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Laboratory } from "./Laboratory";

@Entity()
export class Antibiotic{
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    antibioticCode: string

    @Column()
    antibioticName: string
    
    @Column()
    antibioticActiveIngrStrength: string


    @ManyToOne((type) => Laboratory)
    @JoinColumn()
    public laboratory: Promise<Laboratory>

    @Column({nullable: true})
    public laboratoryId: number
    
}  


 