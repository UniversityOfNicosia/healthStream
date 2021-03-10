import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import {ConfigSchema} from './schema'
import { IGooogleFitServiceConfig } from '../services/googleFit'

const CURRENT_FOLDER = path.basename(path.join(__dirname, '..'))

const BASE_PATH = `${CURRENT_FOLDER}`

export class AppConfig {
  private readonly _env: Record<string, string>
  constructor(envFilePath?: string) {
    const envExists = envFilePath && fs.existsSync(envFilePath)
    envExists && dotenv.config({path: envFilePath})
    const {value, error} = ConfigSchema.validate(process.env, {allowUnknown: true, stripUnknown: true})
    if (error) {
      throw new Error(`Missing Required Environment Variables | ${error.message}`)
    }
    this._env = value
  }

  public get port(): number {
    return +this._env.PORT
  }

  public get server() {
    return {
      allowAuthSpoofing: Boolean(this._env.ALLOW_AUTH_SPOOFING),
      cookieDomain: this._env.COOKIE_DOMAIN,
      traceGraphql: Boolean(this._env.TRACE_GRAPHQL),
      showOriginalError: Boolean(this._env.SHOW_ORIGINAL_ERROR),
    }
  }

  public get environment(): string {
    return this._env.NODE_ENV
  }

  public get isTestMode(): boolean {
    return !['production', 'staging'].includes(this.environment)
  }

  public get logLevel(): string {
    return this._env.LOGGER_LEVEL
  }

  public get googleFitConfig(): IGooogleFitServiceConfig {
    return {
      clientId: this._env.GOOGLE_CLIENT_ID,
      clientSecret: this._env.GOOGLE_CLIENT_SECRET,
      redirectUri: 'http://localhost:3000/api/connect/oauth2callback'
    }
  }

 
  public get ormMySQLOptions(): any {
    const extension = __filename.endsWith(".ts") ? "ts" : "js";
    return {
    type: 'mysql',
    host: 'localhost',
    port: this._env.DATABASE_PORT,
    username: 'root',
    database: 'healthstream',
    entities: [`${BASE_PATH}/database/entity/**/*.${extension}`],
    migrations: [`${BASE_PATH}/database/migrations/**/*.${extension}`],
    cli: {
      migrationsDir: `${BASE_PATH}/database/migrations/`,
    },
    migrationsTableName: "__migration",
    seeds: [ `${BASE_PATH}/database/seeds/*{.ts,.js}`],
    synchronize: false, 
    logging: true,
  
    }
  }

  
}

let ENV = process.env.NODE_ENV
if (!ENV || ENV.indexOf('dev') > -1) {
  ENV = 'local'
}
const ENV_FILE_PATH = `.env.${ENV}`

export default new AppConfig(ENV_FILE_PATH)
