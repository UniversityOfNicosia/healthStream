import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LabBeneficiary, LabIssuingProvider, LabUser } from ".";
import { OrderCategory } from "../common/enums";
import { Antibiotic } from "./Antibiotic";
import { LabActivity } from "./LabActivity";

@Entity()
export class Laboratory{
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    messageType: string

    @Column({type:'timestamp'})
    timestamp: Date

    @Column()
    labOrderId: number

    @Column({nullable: true})
    relatedOrderId: number

    @Column()
    labOrderExecutionId : number

    @Column()
    visitId : number

    @Column({nullable: true})
    labSystemVisitId: string

    @Column()
    executingProviderId: string

    @Column({type: 'enum', enum: OrderCategory})
    labOrderCategory: OrderCategory

    @Column({type:'timestamp'})
    labOrderIssueDate: Date
     
    @Column({type:'timestamp'})
    labOrderEffectiveFromDate : Date

    @Column({type:'timestamp'})
    labOrderExpiryDate: Date

    @Column({type:'timestamp'})
    labOrderReservedOnDate: Date

    @Column({type:'timestamp'})
    labOrderReservationExpiryDate: Date

    @Column({type:'timestamp', nullable: true})
    labOrderNotes: string

    @Column({type:'numeric'})
    beneficiaryCoPaymentAmount: number

    @Column({type:'numeric'})
    reimbursementPoints: number

  
    @Column({default: true})
    public hasAntibiotics: boolean

 

    @OneToOne((type) => LabUser, (labUser) => labUser.laboratory)
    public userDetails?: Promise<LabUser>

    @OneToOne((type) => LabBeneficiary, (beneficiaryDetails) => beneficiaryDetails.laboratory)
    public beneficiaryDetails?: Promise<LabBeneficiary>

    @OneToOne((type) => LabIssuingProvider, (labIssuingProvider) => labIssuingProvider.laboratory)
    public issuingProviderDetails?: Promise<LabIssuingProvider>

 
    @OneToMany((type) => Antibiotic, (antibiotic) => antibiotic.laboratory, {cascade: true, lazy: true, nullable: true})
    public antibioticList?: Promise<Antibiotic[]> 
 
    @OneToMany((type) => LabActivity, (labActivity) => labActivity.laboratory, {cascade: true, lazy: true, nullable: true})
    public activities?: Promise<LabActivity[]> 


}