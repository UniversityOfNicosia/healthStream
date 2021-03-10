import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Laboratory } from ".";

@Entity()
export class LabIssuingProvider{
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    issuingProviderId: string
    
    @Column()
    issuingProviderName: string

    @Column()
    issuingProviderLastName: string 

    @Column()
    issuingProviderWorkPhoneNumber: string
 

    @OneToOne(() => Laboratory, (laboratory) => laboratory.id, {lazy: true, cascade: true})
    @JoinColumn()
    public laboratory: Promise<Laboratory>
  
    @Column({nullable: true})
    public laboratoryId: number
}  

 