import { EntityManager } from "typeorm";
import { LabUser } from "../entity/LabUser";
import { ADataService } from "./ADataService";

export class LabUserDataService extends ADataService<LabUser> {
  constructor(em: EntityManager) {
    super(em, LabUser);
  }
}
