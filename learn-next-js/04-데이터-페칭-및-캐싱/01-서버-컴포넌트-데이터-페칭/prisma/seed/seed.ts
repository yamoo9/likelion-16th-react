import { prisma } from "@/lib/prisma"
import userData from './seed-data.json'

async function main() {
  console.log('🌱 데이터 시딩(초기 데이터 심기) 시작...')

  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        posts: {
          create: user.posts
        }
      }
    })
  }

  console.log('✅ 데이터 시딩이 성공적으로 완료되었습니다.')
}

main()
  .catch(error => {
    console.error('❌ 시딩 중 에러 발생:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })