export const log = (message: string, cssCode: string = 'color: #3b83f6') => {
  console.log(`%c${message}`, cssCode)
}
