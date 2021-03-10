import appConfig, {AppConfig} from '../config'
import GoogleFit from './googleFit'

export class ServiceFactory {
  private _googleFitService: GoogleFit
 
  constructor(private readonly config: AppConfig) {}

  public getGoogleFitService(): GoogleFit {
    this._googleFitService = this._googleFitService ?? new GoogleFit(this.config.googleFitConfig)
    return this._googleFitService
  }

 
}

export const serviceFactory = new ServiceFactory(appConfig)
