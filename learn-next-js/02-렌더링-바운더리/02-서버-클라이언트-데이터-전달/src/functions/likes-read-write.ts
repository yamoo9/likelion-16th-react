// 서버 지시어를 추가한 파일의 모든 함수는 "서버 함수"
// 참고: https://shorturl.at/WySaA
'use server' 

import fs from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'

import { revalidatePath } from 'next/cache'
import { isErrorObject } from '@/utils'

// 데이터가 저장될 절대 경로를 설정합니다. (프로젝트 루트의 src/data/likes.json)
const dataPath = path.join(process.cwd(), 'src/data/likes.json')

/**
 * [서버 함수] 저장된 좋아요 숫자를 읽어옵니다.
 */
export async function readLikes() {
  try {
    const jsonString = await fs.readFile(dataPath, { encoding: 'utf-8' })
    const data = JSON.parse(jsonString) as { count: number }
    return data.count
  } catch {
    // 파일이 없거나 읽기 실패 시 기본값 0을 반환하여 안전하게 처리합니다.
    return 0
  }
}

/**
 * [서버 함수] 새로운 좋아요 숫자를 파일에 저장합니다.
 */
export async function writeLikes(likeCount: number) {

  try {
    
    // 저장할 객체를 가독성 좋은 JSON 문자열로 변환합니다.
    const jsonString = JSON.stringify({ count: likeCount }, null, 2)
    
    // 서버 파일 시스템에 데이터를 기록합니다.
    await fs.writeFile(dataPath, jsonString, { encoding: 'utf-8' })
    
    // [ISR / 주문형 재검증(On-demand Revalidation)]
    // 데이터가 변경되었으므로 해당 경로('/')의 캐시를 갱신하여 최신 화면을 보여줍니다. 
    revalidatePath('/')
    return { success: true }
  } catch(error) {
    // 에러 발생 시 상세 내용을 콘솔에 기록하고 실패 상태를 반환합니다.
    if (isErrorObject(error)) console.error(error.message)
    else console.error('[에러 발생]', String(error))
    return { success: false }
  }
}