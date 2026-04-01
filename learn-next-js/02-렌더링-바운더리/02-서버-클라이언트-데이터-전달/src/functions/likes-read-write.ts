// 데이터 읽기 (서버 전용 함수)
export async function readLikes() {
  return 0
}

// 데이터 쓰기 (서버 전용 함수)
export async function writeLikes(likeCount: number) {
  console.log(likeCount)
}
