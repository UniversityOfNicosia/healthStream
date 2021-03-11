import { EntityManager } from "typeorm";
import { ILaboratoryUpsertParams, ILabTestResultUpsertParams } from "../common/typings";
import { LabTestResult } from "../entity/LabTestResult";
import { ADataService } from "./ADataService";

export class LabTestResultDataService extends ADataService<LabTestResult> {
  constructor(em: EntityManager) {
    super(em, LabTestResult);
  }


  public async add(params: ILabTestResultUpsertParams): Promise<LabTestResult> {
    console.log("heee ther PRAMS AR E", params)
   const testResult = this.repository.create({
   ...params,
  }) 
 return this.repository.save(testResult).then((savedTestResult) => savedTestResult)
}
}
