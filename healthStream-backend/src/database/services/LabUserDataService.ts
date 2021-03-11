import { EntityManager } from "typeorm";
import {  ILabUserUpsertParams } from "../common/typings";
import { LabUser } from "../entity/LabUser";
import { ADataService } from "./ADataService";

export class LabUserDataService extends ADataService<LabUser> {
  constructor(em: EntityManager) {
    super(em, LabUser);
  }


  
  public async add(params: ILabUserUpsertParams): Promise<LabUser> {
    const labUser = this.repository.create({
    ...params,
   }) 
     return this.repository.save(labUser).then((saveLabUser) => saveLabUser)
 }

}
