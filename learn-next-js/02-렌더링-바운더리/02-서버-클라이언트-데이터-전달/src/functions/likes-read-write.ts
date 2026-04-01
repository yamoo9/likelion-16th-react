// 서버 지시어를 추가한 파일의 모든 함수는 "서버 함수"
// 참고: https://ko.react.dev/reference/rsc/server-functions#importing-server-functions-from-client-components
'use server' 


// Node.js 모듈 가져오기
import fs from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import { isErrorObject } from '@/utils'

const dataPath = path.join(process.cwd(), 'src/data/likes.json')
console.log('likes.json 데이터 경로:', dataPath)

// 데이터 읽기 (서버 전용 함수)
export async function readLikes() {
  try {
    const jsonString = await fs.readFile(dataPath, { encoding: 'utf-8' })
    const data = JSON.parse(jsonString) as { count: number }
    return data.count
  } catch {
    // 실제 데이터를 못 읽어와도 0을 기반 값으로 반환
    return 0
  }
}

// 데이터 쓰기 (서버 전용 함수)
export async function writeLikes(likeCount: number) {

  try {
    // 클라이언트에서 전달된 데이터 값 -> JSON 문자화(stringify)
    const jsonString = JSON.stringify({ count: likeCount })
    // JSON 문자열을 fs.writeFile() API(함수) 서버의 likes.json 파일 쓰기
    await fs.writeFile(dataPath, jsonString, { encoding: 'utf-8' })
    return { success: true }
  } catch(error) {
    if (isErrorObject(error)) console.error(error.message)
    else console.error('[에러 발생]', String(error))
    return { success: false }
  }
}
