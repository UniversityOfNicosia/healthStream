 


import {Repository, EntityManager, DeepPartial} from 'typeorm'
import DataLoader from 'dataloader'
import {snakeCase, get, keyBy} from 'lodash'
import {ID, ObjectType} from '../../typings'
import {IdentifierNotProvidedError} from '../../errors'
import {IDataService, IGetManyQueryArgs} from './_typings'

export abstract class ADataService<T> implements IDataService<T> {
  public readonly repository: Repository<T>

  protected readonly loader: DataLoader<string | number, T>

  constructor(protected readonly em: EntityManager, private readonly _entity: ObjectType<T>) {
    this.repository = em.getRepository(_entity)
    this.loader = new DataLoader<string | number, T>(async (ids) =>
      this.getManyByIds(ids as any[]).then((results) => {
        const keyedResults = keyBy(results, this.primaryColumnName)
        return ids.map((id) => keyedResults[id])
      })
    )
  }

  private get primaryColumnName(): string {
    return this.repository.metadata.primaryColumns[0].propertyName
  }

  public get deletedAtColumnName(): string | undefined {
    const deletedAtColumn = this.repository.metadata.ownColumns.find((c) => c.isDeleteDate)
    return deletedAtColumn && deletedAtColumn.databaseName
  }

  public async load(id: string | number): Promise<T | null> {
    if (!id) return null
    return this.loader.load(id)
  }

  public async loadMany(ids: Array<string | number>): Promise<T[]> {
    if (!ids || ids.length < 1) return []
    return this.loader.loadMany(ids) as Promise<T[]>
  }

  public async getById(id: ID): Promise<T | undefined> {
    if (!id) throw new IdentifierNotProvidedError()
    return this.repository.findOne(id, {withDeleted: true}).then((entity) => {
      if (entity) {
        this.loader.prime(id, entity)
      }
      return entity
    })
  }

  public async getManyByIds(ids: ID[]): Promise<T[]> {
    if (!ids || ids.length < 1) return []
    return this.repository.findByIds(ids, {withDeleted: true})
  }

  public async count(args?: IGetManyQueryArgs<T>): Promise<number> {
    const query = this.repository.createQueryBuilder()
    // this.applyGetManyFilters(query, args, true)
    return query.getCount()
  }

  public async getMany(args?: IGetManyQueryArgs<T>): Promise<T[]> {
    const query = this.repository.createQueryBuilder(this.repository.metadata.name)
    // this.applyGetManyFilters(query, args, false)
    return query.getMany().then((entities) => {
      if (entities) {
        entities.forEach((entity) => this.loader.prime((entity as any)[this.primaryColumnName], entity))
      }
      return entities
    })
  }

  public async removeById(id: ID): Promise<T> {
    return this.repository.findOneOrFail(id).then((entityToRemove) => {
      if (this.deletedAtColumnName) {
        if (get(entityToRemove, 'deletedAt')) {
          return entityToRemove
        }
        return this.repository.softRemove(entityToRemove)
      }

      const returnObj = this.clone(entityToRemove)
      return this.repository.remove(entityToRemove).then(() => returnObj)
    })
  }

  public async removeManyByIds(ids: ID[]): Promise<T[]> {
    const entitiesToBeDeleted = await this.repository.findByIds(ids)
    if (this.deletedAtColumnName) {
      return this.repository.softRemove(entitiesToBeDeleted)
    }
    const clonedEntitiesToBeDeleted = entitiesToBeDeleted.map((e) => this.clone(e))
    return this.repository.remove(entitiesToBeDeleted).then(() => clonedEntitiesToBeDeleted)
  }

  public async deleteById(id: ID): Promise<boolean> {
    return this.deleteManyByIds([id])
  }

  public async deleteManyByIds(ids: ID[]): Promise<boolean> {
    if (this.deletedAtColumnName) {
      return this.repository.softDelete(ids as any).then(() => true)
    }
    return this.repository.delete(ids as any).then((r) => Number(r.affected) > 0)
  }

  public rehydrateMany(entities: Array<DeepPartial<T>>): T[] {
    return entities.map((entity) => this.rehydrate(entity))
  }

  public rehydrate(entity: DeepPartial<T>): T {
    return this.repository.create(entity)
  }

  public clone(entity: T): T {
    return this.repository.create({...entity})
  }

  protected rehydrateFromRaw(raw: any): T | null {
    if (!raw) return null
    const hydrated = this.getInstance()
    Object.keys(this.repository.metadata.propertiesMap).forEach((key) => {
      hydrated[key as keyof T] = raw[snakeCase(key)]
    })
    return hydrated
  }

  protected getInstance(): T {
    return new (this._entity as new () => T)()
  }
}
