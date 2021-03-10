import {initDatabaseConnection} from '../database/init'
export const resetDb = (closeConnectionOnDone = true) =>
  initDatabaseConnection().then((connection) =>
    connection
      .dropDatabase()
      .then(() => connection.runMigrations())
      .then(() => closeConnectionOnDone && connection.close())
  )

void resetDb().then(() => {
  process.exit(0)
})
