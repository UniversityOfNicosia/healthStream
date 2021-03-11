import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LabActivity } from "./LabActivity";

@Entity()
export class LabTestResult{
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    testCode: string

    @Column()
    testName: string
    
    @Column()
    resultValue: string

    @Column()
    resultUnits: string

    @Column()
    resultReferenceRange : string

    @Column({nullable: true})
    resultComments: string

    @ManyToOne((type) => LabActivity)
    @JoinColumn()
    public activity: Promise<LabActivity>

    @Column({nullable: true})
    public activityId: number
}  