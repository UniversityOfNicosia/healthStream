import { EntityManager } from "typeorm";
import {  ILabIssuingProviderUpsertParams } from "../common/typings";
import { LabIssuingProvider } from "../entity/LabIssuingProvider";
import { ADataService } from "./ADataService";

export class LabIssuingProviderDataService extends ADataService<LabIssuingProvider> {
  constructor(em: EntityManager) {
    super(em, LabIssuingProvider);
  }

  
  public async add(params: ILabIssuingProviderUpsertParams): Promise<LabIssuingProvider> {
    const labIssuingProvider = this.repository.create({
    ...params,
   }) 
     return this.repository.save(labIssuingProvider).then((savedLabIssuingProvider) => savedLabIssuingProvider)
 }
}
