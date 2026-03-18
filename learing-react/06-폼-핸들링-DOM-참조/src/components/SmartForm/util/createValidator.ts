export function createValidator(
  requiredMessage: string,
  customValidator: (value: string) => string,
) {

  return (value: string, isTouched: boolean): readonly [string, boolean] => {
    if (!isTouched) return ['', false] 
    if (!value) return [requiredMessage, true]
    const error = customValidator(value)
    const showError = error !== ''
    return [error, showError]
  }
  
}