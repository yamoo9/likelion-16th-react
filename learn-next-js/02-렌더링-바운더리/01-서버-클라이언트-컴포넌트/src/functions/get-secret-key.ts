export function getSecretKey() {
  
  // Node.js로 운영되고 있는 서버 환경
  // process.env.환경변수
  return process.env.SECRET_API_KEY
}
