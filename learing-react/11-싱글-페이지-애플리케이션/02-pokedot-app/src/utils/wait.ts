/**
 * [테스트용 지연 함수: wait]
 * 의도적으로 지연 시간(delay)을 발생시키고, 확률적으로 성공 또는 실패를 반환합니다.
 * UI 로딩 상태나 에러 처리를 테스트할 때 유용합니다.
 * 
 * @param delay - 지연 시간 (기본값: 1000ms)
 * @param successOrFail - true일 경우 50% 확률로 실패(reject) 발생
 */
export async function wait(delay = 1000, successOrFail = false) {
  return new Promise((resolve, reject) => {
    // 기본적으로 성공(resolve) 함수를 실행 대상으로 설정
    let excuteFn = resolve

    // 실패 모드가 켜져 있고, 50% 확률에 당첨되면 실패(reject) 함수로 교체
    if (successOrFail && Math.random() < 0.5) {
      excuteFn = reject
    }

    // 설정된 시간(delay) 후에 결정된 함수(성공 또는 실패)를 실행
    setTimeout(excuteFn, delay)
  })
}
