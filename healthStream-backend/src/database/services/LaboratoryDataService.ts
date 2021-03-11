import { EntityManager } from "typeorm";
import { ILaboratoryUpsertParams } from "../common/typings";
import { Laboratory } from "../entity/Laboratory";
import { ADataService } from "./ADataService";
import {Promise} from 'bluebird'
import { AntibioticDataService } from "./AntibioticDataService";
import { LabUserDataService } from "./LabUserDataService";
import { LabBeneficiaryDataService } from "./LabBeneficiaryDataService";
import { LabIssuingProviderDataService } from "./LabIssuingProviderDataService";
import { LabActivityDataService } from "./LabActivityDataService";

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
      if (activities) {
        await Promise.map(activities, (c) => new LabActivityDataService(this.em).add({laboratoryId: savedLaboratory.id, ...c}))
      }
      if (userDetails) {
          await new LabUserDataService(this.em).add({laboratoryId: savedLaboratory.id, ...userDetails})
      }
      if (beneficiaryDetails) {
         await new LabBeneficiaryDataService(this.em).add({laboratoryId: savedLaboratory.id, ...beneficiaryDetails})
      }
      if (issuingProviderDetails) {
        await new LabIssuingProviderDataService(this.em).add({laboratoryId: savedLaboratory.id, ...issuingProviderDetails})
     }
      return savedLaboratory
    })
  }
}
