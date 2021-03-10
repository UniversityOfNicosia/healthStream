import { EntityManager } from "typeorm";
import { ILabActivityUpsertParams } from "../common/typings";
import { LabActivity } from "../entity/LabActivity";
import { ADataService } from "./ADataService";
import {Promise} from 'bluebird'
import { LabTestResultDataService } from "./LabTestResultDataService";

export class LabActivityDataService extends ADataService<LabActivity> {
  constructor(em: EntityManager) {
    super(em, LabActivity);
  }

  public async add(params: ILabActivityUpsertParams): Promise<LabActivity> {
      const {results, ...restParams} = params
     const activity = this.repository.create({
      ...restParams,
     }) 
    return this.repository.save(activity).then(async (savedActivity) => {
      if (results) {
        await Promise.map(results, (c) => new LabTestResultDataService(this.em).add({activityId: savedActivity.id, ...c}))
      }
      return savedActivity
    })
  }
}
