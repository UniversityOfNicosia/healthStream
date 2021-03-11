import { createConnection, getConnection } from "typeorm";
import { AlreadyHasActiveConnectionError } from "typeorm/error/AlreadyHasActiveConnectionError";
import ormConfig from "../ormconfig";

export const initDatabaseConnection = async () => {
  try {
    const connection = getConnection();
    if (!connection || !connection.isConnected) throw new Error();
    return Promise.resolve(connection);
  } catch (e) {
    // if (e instanceof AlreadyHasActiveConnectionError) {
    return createConnection(ormConfig);
    // }
    // throw e;
  }
};
