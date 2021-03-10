import { EntityManager } from "typeorm";
import { LabBeneficiary } from "../entity/LabBeneficiary";
import { ADataService } from "./ADataService";

export class LabBeneficiaryDataService extends ADataService<LabBeneficiary> {
  constructor(em: EntityManager) {
    super(em, LabBeneficiary);
  }
}
