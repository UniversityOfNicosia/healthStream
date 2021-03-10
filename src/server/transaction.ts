

import { NextFunction, Response, Request } from "express";
import onFinished from "on-finished";
import { getConnection } from "typeorm";
import { DataServiceFactory } from "../database/services/Factory";
import appConfig from "../config";
import { ServiceFactory } from "../services";

export const useTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    req.trxContext = queryRunner;
    await req.trxContext.connect();
    await req.trxContext.startTransaction();
    req.dsFactory = new DataServiceFactory(req.trxContext.manager);
    req.externalFactory = new ServiceFactory(appConfig);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onFinished(res, async (err) => {
      try {
        if (!req.trxContext || !req.trxContext?.isTransactionActive) return;
        if (err) {
          await req.trxContext.rollbackTransaction();
        } else {
          await req.trxContext.commitTransaction();
        }
      } finally {
        await req.trxContext?.release();
      }
    });
    next();
  } catch (error) {
    if (req.trxContext?.isTransactionActive) {
      await req.trxContext.rollbackTransaction();
      await req.trxContext.release();
    }
    next(error);
  }
};
