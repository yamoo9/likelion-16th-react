interface PhotoData {
  title: string
  location: string
  date: string
  description: string
}

export const PHOTO_DATA: Record<string, PhotoData> = {
  '1': {
    title: '도심의 건축미',
    location: '대한민국 서울',
    date: '2024.03.15',
    description: '현대적인 건축물의 선과 면이 만들어내는 조형미를 담았습니다.',
  },
  '2': {
    title: '자연의 정적',
    location: '일본 홋카이도',
    date: '2024.01.20',
    description: '끝없이 펼쳐진 설원 위의 고독한 나무 한 그루.',
  },
  '3': {
    title: '네온의 밤',
    location: '일본 도쿄 신주쿠',
    date: '2023.12.05',
    description: '밤이 깊어질수록 화려해지는 도시의 불빛들.',
  },
}