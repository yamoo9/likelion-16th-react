/**
 * [모달 컨텍스트 인터페이스: ModalContextType]
 * useModal 훅을 통해 외부로 노출될 기능들의 규격입니다.
 */
export interface ModalContextType {
  /**
   * 모달을 화면에 띄웁니다.
   * @param title - 스크린 리더가 읽어줄 모달의 제목 (접근성 필수 요소)
   * @param content - 모달 내부에 렌더링할 리액트 요소 (컴포넌트, 텍스트 등)
   */
  openModal: (title: string, content: React.ReactNode) => void 

  /**
   * 현재 열려 있는 모달을 닫습니다.
   */
  closeModal: () => void
  
  /**
   * 모달의 닫힘 상태를 나타냅니다.
   */
  isClosing: boolean
}

/**
 * [모달 데이터 구조: ModalData]
 * 현재 화면에 표시되고 있는 모달의 상태 값을 정의합니다.
 */
export interface ModalData {
  title: string            // 모달의 제목
  content: React.ReactNode // 모달의 본문 내용
}