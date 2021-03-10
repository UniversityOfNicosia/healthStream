import { EntityManager } from "typeorm";
import { ILaboratoryUpsertParams } from "../common/typings";
import { Laboratory } from "../entity/Laboratory";
import { ADataService } from "./ADataService";
import {Promise} from 'bluebird'
import { AntibioticDataService } from "./AntibioticDataService";

export class LaboratoryDataService extends ADataService<Laboratory> {
  constructor(em: EntityManager) {
    super(em, Laboratory);
  }

  public async add(params: ILaboratoryUpsertParams): Promise<Laboratory> {
       const {antibioticList, activities,beneficiaryDetails, issuingProviderDetails, userDetails, ...restParams} = params
     const laboratory = this.repository.create({
      ...restParams,
     }) 
    return this.repository.save(laboratory).then(async (savedLaboratory) => {
      if (antibioticList) {
        await Promise.map(antibioticList, (c) => new AntibioticDataService(this.em).add({laboratoryId: savedLaboratory.id, ...c}))
      }
      // if (userDetails) {
      //   const userDetail = new AntibioticDataService(this.em).add({laboratoryId: savedLaboratory.id, ...c}))
      // }
      return savedLaboratory
    })
  }
}
