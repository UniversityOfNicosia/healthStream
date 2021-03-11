import axios, {AxiosRequestConfig} from 'axios'
import { initDatabaseConnection } from '../database/init';

export const request = (options: AxiosRequestConfig): Promise<any> =>
  axios(options)
    .then((result) =>  {
      return result.data
    })
    .catch((e) => {
      throw e
    })

    export const resetDb = (closeConnectionOnDone = true) => {
        return initDatabaseConnection().then((connection) =>
          connection
            .dropDatabase()
            .then(() => connection.runMigrations())
            .then(() => closeConnectionOnDone && connection.close())
        );
      };