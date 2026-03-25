const { history, location, URLSearchParams } = globalThis

// 내비게이션 요소 참조
const nav = document.querySelector('.nav')
const navLinks = nav.querySelectorAll('.nav-link')

//  앱 마운트 요소 참조 (초기값: null)
let app = null
// 활성 링크 참조 (초기값: null)
let activeLink = null
// 활성 클래스 상수
const ACTIVE_CLASSNAME = 'active'

// 앱 초기화
init()

function init() {
  // 앱 마운트 요소 찾아 참조
  app = document.getElementById('app')
  if (!app) throw new Error('문서 #app 요소가 없습니다.')

  // 이벤트 연결
  bindEvents()
  // 앱 렌더링
  render()
}

function bindEvents() {
  // 문서에 이벤트 위임
  document.addEventListener('click', handleNavigation)
  // popstate 이벤트 감지
  globalThis.addEventListener('popstate', render)
}

function handleNavigation(e) {
  const link = e.target.closest('.nav-link')
  if (!link) return
  e.preventDefault()

  if (activeLink) activeLink.classList.remove(ACTIVE_CLASSNAME)
  link.classList.add(ACTIVE_CLASSNAME)
  activeLink = link

  const path = link.getAttribute('href')
  navigateTo(path)
}

function render() {
  const currentPath = getCurrentPath()

  // [미션 1-1] URLSearchParams를 사용하여 파라미터를 가져오세요.
  const params = null
  const planet = '미정'
  const level = '0'

  // [미션 1-2] 라우트(routes)를 보호해야 합니다.
  // - 조건: 방문 페이지 경로가 `/`이 아니고, `planet` 또는 `level` 파라미터가 없음
  // - 조건이 참인 경우: notFound() 함수 실행
  // - 조건이 거짓인 경우: explorer(planet, level) 함수 실행
  // - 실행 결과를 app의 HTML 콘텐츠로 설정
  app.innerHTML = explorer(planet, level)

  toggleActiveState()
}

// 못찾는 페이지 안내 함수
function notFound() {
  return `
    <h2>⚠️ 페이지를 찾을 수 없습니다.</h2>
    <p class="info-badge">존재하지 않는 경로로 접근하였습니다.</p>
    <p><a href="/" class="nav-link">홈 페이지</a>로 돌아가시겠습니까?</p>
  `.trim()
}

// 탐험(페이지 콘텐츠 렌더링) 함수
function explorer(planet = '미정', level = '0') {
  return `
    <h2>📍 현재 위치: ${planet?.toUpperCase()}</h2>
    <div class="info-badge">위험 등급: Level ${level}</div>
    <p>분석된 쿼리 스트링: ${location.search ?? '없음'}</p>
  `.trim()
}

// 활성 상태 토글 함수
function toggleActiveState() {
  const currentPath = getCurrentPath()

  for (const link of navLinks) {
    const isActive = link.getAttribute('href') === currentPath
    link.classList.toggle(ACTIVE_CLASSNAME, isActive)
    // [미션 5] 현재 활성화된 링크에 접근성을 설정합니다.
    
  }
}

// 접근성 설정 함수
function a11yActiveState(link, isActive) {
  link.setAttribute('aria-disabled', isActive)
    isActive 
      ? link.setAttribute('aria-current', 'page')
      : link.removeAttribute('aria-current')
}

// 현재 경로 가져오기 함수
function getCurrentPath() {
  const { pathname, search } = location
  const currentPath = pathname + search
  return currentPath
}

function navigateTo(path, state = null) {
  // [미션 2] 현재 경로와 전달된 path가 동일한 경우 이동을 하지 않도록 설정하세요.
  
  // [미션 3] history.pushState를 사용해 새로고침 없이 URL 주소를 변경하세요.
  
  // [미션 4-1] PopStateEvent를 사용해 'popstate' 이벤트를 정의하세요.
  
  // [미션 4-2] dispatchEvent() 메서드로 'popstate' 이벤트를 발동시킵니다.
  
}