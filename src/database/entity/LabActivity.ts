





















   
  
  
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
  import { ActivityType} from "../common/enums";
import { Laboratory } from "./Laboratory";
import { LabTestResult } from "./LabTestResult";
  
  @Entity()
  export class LabActivity{
      @PrimaryGeneratedColumn() 
      id: number
  
      @Column()
      sequenceNumber: number
      
      @Column()
      code: string
   
      @Column({type: 'enum', enum: ActivityType})
      type: ActivityType
         
      @Column()
      name: string
               
      @Column({nullable: true})
      labTestComments: string

      @Column()
      labTestResultsRequired: boolean

      @Column({nullable: true})
      sampleTypeName: string

      @ManyToOne((type) => Laboratory)
      @JoinColumn()
      public laboratory: Promise<Laboratory>
  
      @Column({nullable: true})
      public laboratoryId: number

      @OneToMany((type) => LabTestResult, (LabTestResult) => LabTestResult.activity, {cascade: true, lazy: true, nullable: true})
      public results?: Promise<LabTestResult[]> 
  }  
   