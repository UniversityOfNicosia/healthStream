import { EntityManager } from "typeorm";
import { User } from "../entity/User";
import { ADataService } from "./ADataService";

export class UserDataService extends ADataService<User> {
  constructor(em: EntityManager) {
    super(em, User);
  }
}
