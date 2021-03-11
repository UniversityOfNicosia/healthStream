import { EntityManager } from "typeorm";
import { ILabBeneficiaryUpsertParams } from "../common/typings";
import { LabBeneficiary } from "../entity/LabBeneficiary";
import { ADataService } from "./ADataService";

export class LabBeneficiaryDataService extends ADataService<LabBeneficiary> {
  constructor(em: EntityManager) {
    super(em, LabBeneficiary);
  }

  public async add(params: ILabBeneficiaryUpsertParams): Promise<LabBeneficiary> {
    const labBeneficiary = this.repository.create({
    ...params,
   }) 
     return this.repository.save(labBeneficiary).then((savedLabBenefiary) => savedLabBenefiary)
 }
}
