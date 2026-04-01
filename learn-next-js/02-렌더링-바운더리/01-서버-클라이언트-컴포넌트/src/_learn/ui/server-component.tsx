import { cn } from '@/utils'
import { getSystemInfo, type SystemInfo } from '@/functions/get-system-info'
import { getSecretKey } from '@/functions/get-secret-key'

export default function ServerComponent() {
  
  // 운영중인 개발 서버 컴퓨터의 시스템 정보 가져오기
  const serviceInfo: SystemInfo = getSystemInfo()

  // 노출되면 안되는 민감한 정보 (API KEY, TOKEN 등)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const secretKey = getSecretKey()
  // console.log(secretKey) // 오직 서버에서만 읽기 가능 (클라이언트에 노출 안됨 ❌)

  return (
    <section
      className={cn(
        'my-5 flex flex-col items-center justify-center gap-4',
        'rounded-xl border-3 border-cyan-500 px-12 py-5',
        'bg-cyan-50',
      )}
      aria-labelledby="server-component-title"
    >
      <div className="text-center">
        <h2
          id="server-component-title"
          className="mb-3 text-xl font-bold text-cyan-700"
        >
          서버 컴포넌트 (
          <abbr
            title="React Server Component"
            aria-label="React Server Component"
            className={cn(
              'cursor-help',
              'no-underline decoration-pink-500/30 underline-offset-4 hover:underline',
            )}
          >
            RSC
          </abbr>
          )
        </h2>
        <p className="font-mono text-xs text-cyan-800">
          이 컴포넌트는 서버(Node.js) 환경에서 안전하게 실행되었습니다.
        </p>
      </div>

      <div className="w-full rounded-lg border border-cyan-200 bg-white/90 p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-cyan-800">
          시스템 정보
        </h3>
        {serviceInfo.length === 0 ? (
          <p className="text-xs text-slate-700">시스템 정보를 가져옵니다.</p>
        ) : (
          <dl className="grid grid-cols-1 gap-y-1 font-mono text-xs">
            {serviceInfo.map((info) => (
              <div
                key={info.label}
                className="flex border-b border-cyan-100 pb-1 last:border-0"
              >
                <dt className="w-16 font-bold text-cyan-600 opacity-80">
                  {info.label}:
                </dt>
                <dd className="text-cyan-900">{info.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

    </section>
  )
}
