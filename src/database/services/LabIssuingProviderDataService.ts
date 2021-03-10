import { EntityManager } from "typeorm";
import { LabIssuingProvider } from "../entity/LabIssuingProvider";
import { ADataService } from "./ADataService";

export class LabIssuingProviderDataService extends ADataService<LabIssuingProvider> {
  constructor(em: EntityManager) {
    super(em, LabIssuingProvider);
  }
}
