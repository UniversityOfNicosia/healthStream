/* eslint-disable max-classes-per-file */
import {ObjectType} from '../typings'
import {ErrorCode} from './codes'
export * from './codes'

// #region HttpErrors
export abstract class HTTPClientError extends Error {
  public readonly statusCode!: number

  public readonly name!: string

  constructor(message: Record<string, unknown> | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message))
    } else {
      super(message)
    }
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class HttpBadRequestError extends HTTPClientError {
  public readonly statusCode = 400

  constructor(message: string | Record<string, unknown> = 'Bad Request') {
    super(JSON.stringify({message}))
  }
}

export class HttpUnauthorizedError extends HTTPClientError {
  public readonly statusCode = 401

  constructor(message: string | Record<string, unknown> = 'Unauthorized') {
    super(JSON.stringify({message}))
  }
}

export class HttpNotFoundError extends HTTPClientError {
  public readonly statusCode = 404

  constructor(message: string | Record<string, unknown> = 'NotFound') {
    super(JSON.stringify({message}))
  }
}
// #endregion

// #region Operation Errors
export abstract class OperationError extends Error {
  public readonly code!: string

  public readonly name!: string

  constructor(code: ErrorCode, message?: Record<string, unknown> | string) {
    const errMessage = message || ErrorCode[code]
    if (errMessage instanceof Object) {
      super(JSON.stringify(message))
    } else {
      super(errMessage)
    }
    this.code = ErrorCode[code]
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export abstract class UserOperationError extends OperationError {
  constructor(code: ErrorCode, message?: Record<string, unknown> | string) {
    super(code, message)
  }
}

export class ServiceError<T extends ObjectType<T>> extends OperationError {
  public readonly serviceName: string

  public readonly serviceError: Error | string

  constructor(service: ObjectType<T>, serviceError: Error | string, friendlyMessage: string) {
    super(ErrorCode.THIRD_PARTY_SERVICE_ERROR, friendlyMessage)
    this.serviceName = service.constructor.name
    this.serviceError = serviceError
  }
}

export class SystemError extends OperationError {
  constructor(message?: Record<string, unknown> | string) {
    super(ErrorCode.INTERNAL_SYSTEM_ERROR, message)
  }
}

export class NotImplementedError extends OperationError {
  constructor(message?: Record<string, unknown> | string) {
    super(ErrorCode.NOT_IMPLEMENTED, message)
  }
}

export class IdentifierNotProvidedError extends UserOperationError {
  constructor(message?: Record<string, unknown> | string) {
    super(ErrorCode.ID_NOT_PROVIDED, message)
  }
}

export class UserNotProvidedError extends UserOperationError {
  constructor(message?: Record<string, unknown> | string) {
    super(ErrorCode.USER_NOT_PROVIDED, message)
  }
}

export class OperationNotSupportedError extends UserOperationError {
  constructor(message?: Record<string, unknown> | string) {
    super(ErrorCode.OPERATION_NOT_SUPPORTED, message)
  }
}

export class InvalidArgumentError extends UserOperationError {
  constructor(argumentName: string, argument: any) {
    const message = `Invalid Argument [${JSON.stringify(argument)}] Provided For ${argumentName}`
    super(ErrorCode.INVALID_ARGUMENT, message)
  }
}

export class ModifyDeletedEntityError extends UserOperationError {
  constructor(message = 'Cannot Change Deleted Entity') {
    super(ErrorCode.MODIFY_DELETED_ENTITY, message)
  }
}

export class DBEntityNotFoundError<T extends ObjectType<T>> extends UserOperationError {
  public readonly entityName: string

  constructor(identifier: string | number, entity: T) {
    const entityName = entity.name || entity.constructor?.name
    const message = `No ${entityName} not found with id ${identifier}`
    super(ErrorCode.ENTITY_NOT_FOUND, message)
    this.entityName = entityName
  }
}

export class DBEntityDuplicateError<T extends ObjectType<T>> extends UserOperationError {
  public readonly entityName: string

  constructor(identifier: string | number, entity: T) {
    const entityName = entity.name
    const message = `${entityName} with id ${identifier} already exists`
    super(ErrorCode.ENTITY_DUPLICATE, message)
    this.entityName = entityName
  }
}

export class DBEntityValidationError<T extends ObjectType<T>> extends UserOperationError {
  public readonly entityName: string

  public readonly property: string

  public readonly value: string

  public readonly constraints: string

  constructor(property: string, value: any, constraints: any, entity: T) {
    const entityName = entity.name
    const message = `${entityName} property [${property}] has invalid value ${value} | [${JSON.stringify(constraints)}]`
    super(ErrorCode.VALIDATION, message)
    this.property = property
    this.value = value
    this.constraints = constraints
    this.entityName = entityName
  }
}

export class InSufficientPermissionError extends UserOperationError {
  public readonly requiredPermission?: string

  constructor(message?: string, requiredPermission?: string) {
    const errorMsg = `${message ? `${message} | ` : ''}${ErrorCode[ErrorCode.INSUFFICIENT_PERMISSION]}`
    super(ErrorCode.INSUFFICIENT_PERMISSION, errorMsg)
    this.requiredPermission = requiredPermission
  }
}
// #endregion
