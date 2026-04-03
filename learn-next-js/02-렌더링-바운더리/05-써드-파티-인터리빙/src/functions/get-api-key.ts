import 'server-only'

export const getApiKey = () => {
  console.log('클라이언트에 노출되면 큰일나는 시크릿 API 키!')
  return process.env.SECRET_API_KEY
}

