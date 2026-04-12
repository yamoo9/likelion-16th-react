'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const DATABASE_NAME = 'memos'

export interface Memo {
  id: number
  created_at: string
  title: string
  content: string
  user_id: string
}

/**
 * 메모 생성 (Create)
 */
export async function createMemoAction(formData: FormData) {
  
  const title = formData.get('title')?.toString()
  const content = formData.get('content')?.toString()

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  // RLS 보안 정책이 설정되지 않은 경우 
  // Next.js 서버에서 직접 누구인지 확인해야 합니다.
  // 사용자 정보(auth.getUser)를 가져옵니다. 
  const user = null

  if (!user) {
    throw new Error('메모를 작성하려면 로그인해야 합니다.')
  }

  const { error } = await supabase
    .from(DATABASE_NAME)
    .insert([{ 
      title, 
      content, 
      // ... ← 새 메모를 저장할 때 현재 로그인한 사용자 id를 설정합니다.
    }])

  if (error) throw new Error(error.message)

  revalidatePath('/read-table-data')
}

/**
 * 메모 조회 (Read)
 */
export async function readMemosAction() {
  
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
  .from(DATABASE_NAME)
  .select('*')
    // 데이터 필터링: .eq('user_id', user.id)를 통해 
    // DB에 있는 데이터 중 로그인 사용자 것만 골라낼 수 있습니다. 
    // (RLS 설정하지 않은 경우 직접 확인 필요)
    // ...
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data
}

/**
 * 메모 수정 (Update)
 */
export async function updateMemoAction(id: number, title?: string, content?: string) {

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // RLS 보안 정책이 설정되지 않은 경우 
  // Next.js 서버에서 직접 누구인지 확인해야 합니다.
  // 사용자 정보(auth.getUser)를 가져옵니다. 
  const user = null
  
  if (!user) throw new Error('메모를 수정할 권한이 없습니다.')

    const { error } = await supabase
    .from(DATABASE_NAME)
    .update({ title, content })
    .eq('id', id)
    // 이중 검증: 수정할 메모의 id뿐만 아니라 user_id도 일치해야 합니다.
    // 이중 검증하지 않을 경우, 다른 사람이 메모 ID를 알아내 맘대로 수정할 수 있습니다.
    // ...

  if (error) throw new Error(error.message)

  revalidatePath('/read-table-data')
}

/**
 * 메모 삭제 (Delete)
 */
export async function deleteMemoAction(id: number) {
  
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  // RLS 보안 정책이 설정되지 않은 경우 
  // Next.js 서버에서 직접 누구인지 확인해야 합니다.
  // 사용자 정보(auth.getUser)를 가져옵니다. 
  const user = null

  if (!user) throw new Error('메모를 삭제할 권한이 없습니다.')

  const { error } = await supabase
    .from(DATABASE_NAME)
    .delete()
    .eq('id', id)
    // 삭제 요청 시에도 반드시 본인 데이터인지 확인이 필요합니다.
    // ...

  if (error) throw new Error(error.message)

  revalidatePath('/read-table-data')
}