import { isErrorObject } from "./is-error-object"

export const getErrorMessage = (error: unknown) => {
  return isErrorObject(error) ? error.message : String(error)
}