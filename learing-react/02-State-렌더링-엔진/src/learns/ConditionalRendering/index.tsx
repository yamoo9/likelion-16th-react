import ProfileCard from './ProfileCard'
import S from './style.module.css'

function ConditionalRendering() {
  /**
   * 조건부 렌더링
   * - 박준혁 / 프로젝트 매니저 / 우수 사원
   * - 최병현 / 프론트엔드 개발자 / 신규 입사자 & 우수 사원
   * - 한수정 / 백엔드 개발자 / 신규 입사자
   */

  return (
    <div className={S.container}>
      <h2>팀원 소개</h2>
      <ul className={S.profileList}>
        <li>
          <ProfileCard name="한수정" role="백엔드 개발자" isNew />
        </li>
        <li>
          <ProfileCard name="최병현" role="프론트엔드 개발자" isNew isBest />
        </li>
        <li>
          <ProfileCard name="박준현" role="프로젝트 매니저" isBest />
        </li>
      </ul>
    </div>
  )
}

export default ConditionalRendering
