type Args = unknown[]

type CustomValidator<T extends Args = []> = (
  value: string,
  ...args: T
) => string

type ResultValidator<T extends Args = []> = (
  value: string,
  isTouched: boolean,
  ...args: T
) => readonly [string, boolean]

export function createValidator<T extends Args = []>(
  requiredMessage: string,
  customValidator: CustomValidator<T>,
): ResultValidator<T> {
  return (value, isTouched, ...args) => {
    if (!isTouched) return ['', false]
    if (!value) return [requiredMessage, true]
    const error = customValidator(value, ...args)
    const showError = error !== ''
    return [error, showError]
  }
}
