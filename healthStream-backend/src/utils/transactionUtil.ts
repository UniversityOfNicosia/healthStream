/* eslint-disable no-shadow */
import {getConnection, QueryRunner, Connection} from 'typeorm'

export class TransactionUtil {
  public static runInTransaction(func: (queryRunner: QueryRunner) => Promise<void>, connection?: Connection): Promise<void> {
    const queryRunner = (connection || getConnection()).createQueryRunner()
    queryRunner.data = {...queryRunner.data}
    return (
      queryRunner
        .startTransaction()
        .then(async () => func(queryRunner))
        .then(async () => {
          await queryRunner.commitTransaction().then(() => Promise.resolve())
        })
        .catch(async (err) => {
          if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction()
          }
          throw err
        })
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        .finally(async () => {
          await queryRunner.release()
        })
    )
  }
}
