import http from "http";
import { initDatabaseConnection } from "./database/init";
import app from "./server";
import appConfig from "./config";

let _server: http.Server;

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err as Error);
});

process.on("warning", (err) => {
  console.info("process warning", err);
});

const startServer = async () =>
  initDatabaseConnection().then(() => {
    const { port } = appConfig;
    _server = http.createServer(app);
    _server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `🚀 🚀   HEATH-STREAM  - Backend   - Server running on port ${port} 🚀 🚀`,
        {
          address: _server.address(),
        }
      );
    });
  });

startServer().catch((e) => {
  console.error("Error During Server Startup", e);
});
