import { EntityManager } from "typeorm";
import { IAntibioticUpsertParams } from "../common/typings";
import { Antibiotic } from "../entity/Antibiotic";
import { ADataService } from "./ADataService";

export class AntibioticDataService extends ADataService<Antibiotic> {
  constructor(em: EntityManager) {
    super(em, Antibiotic);
  }


  public async add(params: IAntibioticUpsertParams): Promise<Antibiotic> {
    const antibiotic = this.repository.create({
    ...params,
   }) 
     return this.repository.save(antibiotic).then((savedAntibiotic) => savedAntibiotic)
 }
}
