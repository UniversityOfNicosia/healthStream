import { ID } from "../../typings";

export interface IGetManyQueryArgs<T> {}

export interface IDataService<T> {
  getById(id: ID): Promise<T | undefined>
  getManyByIds(ids: ID[]): Promise<T[]>
  deleteById(id: ID): Promise<boolean>
  deleteManyByIds(ids: ID[]): Promise<boolean>
  removeById(id: ID): Promise<T | undefined>
  removeManyByIds(ids: ID[]): Promise<T[]>
  getMany(findArgs: IGetManyQueryArgs): Promise<T[]>
  count(findArgs: IGetManyQueryArgs): Promise<number>
}
