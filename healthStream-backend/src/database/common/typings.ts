import { ActivityType, Gender, OrderCategory, UserDocType } from "./enums";


export interface ILaboratoryUpsertParams {
    id?: number
    messageType?: string
    timestamp?: Date
    labOrderId?: number
    relatedOrderId?: number
    labOrderExecutionId?: number
    visitId?: number
    labSystemVisitId?: string
    executingProviderId?: string
    labOrderCategory?: OrderCategory
    labOrderIssueDate?: Date
    labOrderEffectiveFromDate?: Date
    labOrderExpiryDate?: Date
    labOrderReservedOnDate?: Date
    labOrderReservationExpiryDate?: Date
    labOrderNotes?: string
    beneficiaryCoPaymentAmount?: number
    reimbursementPoints?: number
    hasAntibiotics?: boolean
    userDetails?: ILabUserUpsertParams
    beneficiaryDetails?: ILabBeneficiaryUpsertParams
    issuingProviderDetails?: ILabIssuingProviderUpsertParams 
    antibioticList?: IAntibioticUpsertParams[] 
    activities?:  ILabActivityUpsertParams[] 
}

export interface ILabUserUpsertParams {
    id?: number
    userName?: string
    userLastName?: string
    userFirstName?: string
    userDocType?: UserDocType
    userDocId?: string
    laboratoryId?: number
}

export interface ILabBeneficiaryUpsertParams {
    id?: number
    beneficiaryId?: string
    beneficiaryDocType?: string
    beneficiaryName?: string 
    beneficiaryLastName?: string
    beneficiaryGender?: Gender
    beneficiaryDOB?: Date
    laboratoryId: number
}
 
export interface ILabIssuingProviderUpsertParams {
    id?: number
    issuingProviderId?: string
    issuingProviderName?: string
    issuingProviderLastName?: string 
    issuingProviderWorkPhoneNumber?: string
    laboratoryId?: number
}

export interface IAntibioticUpsertParams {
    id: number
    antibioticCode?: string
    antibioticName?: string
    antibioticActiveIngrStrength?: string
    laboratoryId?: number
}

export interface ILabActivityUpsertParams {
    id?: number
    sequenceNumber?: number
    code?: string
    type?: ActivityType
    name?:string
    labTestComments?: string
    labTestResultsRequired?: boolean
    sampleTypeName?: string
    laboratoryId?: number
    results?: ILabTestResultUpsertParams[]
}

export interface ILabTestResultUpsertParams {
    id?: number
    testCode?: string
    testName?: string
    resultValue?: string
    resultUnits?: string
    resultReferenceRange?: string
    resultComments?: string
    activityId?: number
}