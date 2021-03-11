import { EntityManager } from "typeorm";
import { UserDataService } from "./UserDataService";
import { AntibioticDataService } from "./AntibioticDataService";
import { LabActivityDataService } from "./LabActivityDataService";
import { LabBeneficiaryDataService } from "./LabBeneficiaryDataService";
import { LabIssuingProviderDataService } from "./LabIssuingProviderDataService";
import { LaboratoryDataService } from "./LaboratoryDataService";
import { LabTestResultDataService } from "./LabTestResultDataService";
import { LabUserDataService } from "./LabUserDataService";

  
export class DataServiceFactory {
  private _userDS: UserDataService;
  private _antibioticDS: AntibioticDataService;
  private _labActivityDS: LabActivityDataService;
  private _labBeneficiaryDS: LabBeneficiaryDataService;
  private _labIssuingProviderDS: LabIssuingProviderDataService;
  private _laboratoryDS: LaboratoryDataService;
  private _labTestResultDS: LabTestResultDataService;
  private _labUserDS: LabUserDataService;


  constructor(private readonly em: EntityManager) {}

  public getUserDS(): UserDataService {
    this._userDS = this._userDS ?? new UserDataService(this.em);
    return this._userDS;
  }

  
  public getAntibioticDS(): AntibioticDataService {
    this._antibioticDS = this._antibioticDS ?? new AntibioticDataService(this.em);
    return this._antibioticDS;
  }

  public getLabActivityDS(): LabActivityDataService {
    this._labActivityDS = this._labActivityDS ?? new LabActivityDataService(this.em);
    return this._labActivityDS;
  }

  public getLabBeneficiaryDS(): LabBeneficiaryDataService {
    this._labBeneficiaryDS = this._labBeneficiaryDS ?? new LabBeneficiaryDataService(this.em);
    return this._labBeneficiaryDS;
  }

  public getLabIssuingProviderDS(): LabIssuingProviderDataService {
    this._labIssuingProviderDS = this._labIssuingProviderDS ?? new LabIssuingProviderDataService(this.em);
    return this._labIssuingProviderDS;
  }
 
  public getLaboratoryDS(): LaboratoryDataService {
    this._laboratoryDS = this._laboratoryDS ?? new LaboratoryDataService(this.em);
    return this._laboratoryDS;
  }

  
  public getLabTestResultDS(): LabTestResultDataService {
    this._labTestResultDS = this._labTestResultDS ?? new LabTestResultDataService(this.em);
    return this._labTestResultDS;
  }

  
  public getLabUserDS(): LabUserDataService {
    this._labUserDS = this._labUserDS ?? new LabUserDataService(this.em);
    return this._labUserDS;
  }

  
}
