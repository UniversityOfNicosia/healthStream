export type ObjectType<T> = (new () => T) | Function

export interface IAuthToken {
  email: string
}

export interface IJWTToken {
  header: any
  payload: any
  signature: any
}

export type ID = string | number