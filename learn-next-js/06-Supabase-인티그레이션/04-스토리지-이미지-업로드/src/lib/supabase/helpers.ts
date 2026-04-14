import 'server-only'
import { cookies } from 'next/headers'
import { createClient } from './server'

export const createSupabase = async () => {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}
