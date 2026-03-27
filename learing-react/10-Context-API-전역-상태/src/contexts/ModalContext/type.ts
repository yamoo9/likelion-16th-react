export interface ModalData {
  title: string
  content: React.ReactNode
}

export interface ModalContextType {
  modal: ModalData | null
  isClosing: boolean
  modalTitleId: string
  open: (title: string, content: React.ReactNode) => void
  close: () => void
  confirmClose: () => void
}