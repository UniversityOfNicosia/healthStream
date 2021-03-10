import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Laboratory } from ".";
import { Gender} from "../common/enums";

@Entity()
export class LabBeneficiary{
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    beneficiaryId: string
    
    @Column()
    beneficiaryDocType: string

    @Column()
    beneficiaryName: string 

    @Column()
    beneficiaryLastName: string

    @Column({type: 'enum', enum: Gender})
    beneficiaryGender: Gender

    @Column()
    beneficiaryDOB: Date

    @OneToOne(() => Laboratory, (laboratory) => laboratory.id, {lazy: true, cascade: true})
    @JoinColumn()
    public laboratory: Promise<Laboratory>
  
    @Column({nullable: true})
    public laboratoryId: number
}  