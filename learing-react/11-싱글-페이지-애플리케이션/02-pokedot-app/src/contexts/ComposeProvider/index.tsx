import { cloneElement } from 'react'

/**
 * [ComposeProvider 속성 정의: Props]
 * - providers: 중첩시킬 Provider 컴포넌트들의 배열입니다.
 * - children: 최종적으로 가장 안쪽에 위치할 실제 앱 컴포넌트들입니다.
 */
type Props = React.PropsWithChildren<{
  providers: React.ReactElement[]
}>

/**
 * [프로바이더 합성 컴포넌트: ComposeProvider]
 * 여러 개의 Provider를 중첩해서 사용할 때 코드가 
 * 오른쪽으로 계속 길어지는 'Provider Hell' 현상을 방지하기 위해 사용합니다.
 * 
 * @example
 * <ComposeProvider providers={[<AuthProvider />, <ThemeProvider />]}>
 *   <App />
 * </ComposeProvider>
 */
export default function ComposeProvider({ providers, children }: Props) {
  /* 
    [핵심 로직: reduceRight]
    - 배열의 오른쪽(끝)에서부터 왼쪽으로 요소를 하나씩 꺼내며 처리합니다.
    - 초기값(children)을 가장 안쪽에 두고, 그 겉을 Provider로 하나씩 감싸 나갑니다.
    
    동작 과정 예시: [A, B, C] 순서로 providers가 들어오면
    1회차: <C>{children}</C>
    2회차: <B><C>{children}</C></B>
    3회차: <A><B><C>{children}</C></B></A> (최종 결과)
  */
  return providers.reduceRight(
    (innerProvider, Provider) => (
      // Provider는 ReactElement이므로, 그 자식(children)으로 이전 단계의 결과물을 넣습니다.
      cloneElement(Provider, {}, innerProvider)
    ),
    children,
  )
}