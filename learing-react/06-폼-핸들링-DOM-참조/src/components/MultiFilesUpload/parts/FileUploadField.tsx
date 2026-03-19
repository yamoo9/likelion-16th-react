import type { ChangeEvent, RefObject } from 'react'
import type { Preview } from '../MultiFilesUpload'
import { CloseIcon, UploadIcon } from './SvgIcon'
import S from '../MultiFilesUpload.module.css'

interface Props {
  previews: Preview[]  // 미리보기 이미지 목록
  ref: RefObject<HTMLInputElement | null>  // 파일 입력 요소에 대한 참조
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void  // 파일 선택 시 호출되는 함수
  onDeleteFile: (id: Preview['id'], url: Preview['url']) => void  // 파일 삭제 시 호출되는 함수
}

export default function FileUploadField({
  ref,
  previews,
  onFileChange,
  onDeleteFile,
}: Props) {
  
  return (
    <div className={S.field}>
      <span className={S.label}>이미지 첨부</span>
      <div className={S.uploadWrapper}>
        <input
          type="file"
          id="galleryImages"
          name="galleryImages"
          accept="image/*"  // 이미지 파일만 허용
          multiple  // 여러 파일 선택 가능
          ref={ref}
          className={S.hiddenInput}
          onChange={onFileChange}
        />

        {/* 파일 업로드 버튼 (실제 input을 대체하는 UI) */}
        <label htmlFor="galleryImages" className={S.uploadZone}>
          <UploadIcon />
          <p className={S.uploadText}>
            <strong>파일 선택 (여러 장 가능)</strong>
          </p>
        </label>

        {/* 선택된 이미지 미리보기 영역 */}
        {previews.length > 0 && (
          <div className={S.previewWrapper}>
            {previews.map((p) => (
              <div key={p.id} className={S.previewContainer}>
                {/* 이미지 미리보기 */}
                <img src={p.url} className={S.previewImg} alt="미리보기" />
                {/* 이미지 삭제 버튼 */}
                <button
                  type="button"
                  className={S.removeButton}
                  onClick={() => onDeleteFile(p.id, p.url)}  // 삭제 버튼 클릭 시 해당 이미지 제거
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
