export function Table() {
  return (
    <div className="overflow-x-auto py-2">
      <table className="text-md w-full border-collapse border border-gray-300">
        <caption className="mb-4 text-left text-xl font-bold text-gray-800">
          URL 경로에 따른 슬롯 매칭 (작동 원리)
        </caption>
        <thead>
          <tr className="bg-slate-50">
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3 font-semibold text-gray-900"
            >
              URL 경로
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3 font-semibold text-gray-900"
            >
              {'{children}'}
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3 font-semibold"
            >
              {'{auth}'}
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3 font-semibold text-gray-600"
            >
              {'{chart} / {statistics}'}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              scope="row"
              className="border border-gray-300 text-left bg-gray-50 px-4 py-4 font-medium"
            >
              {'/dashboard'}
            </th>
            <td className="border border-gray-300 px-4 py-4">
              {'app/dashboard/page.tsx'}
            </td>
            <td className="border border-gray-300 px-4 py-4">
              {'@auth/page.tsx'}
            </td>
            <td className="border border-gray-300 px-4 py-4">
              {'각 폴더/page.tsx'}
            </td>
          </tr>
          <tr className="bg-blue-50/30">
            <th
              scope="row"
              className="border border-gray-300 bg-gray-50 px-4 py-4 font-medium"
            >
              {'/dashboard/login'}
            </th>
            <td className="border border-gray-300 px-4 py-4 text-gray-500">
              {'login/page.tsx (null)'}
            </td>
            <td className="border border-gray-300 px-4 py-4">
              {'@auth/login/page.tsx'}
            </td>
            <td className="border border-gray-300 px-4 py-4">
              {'각 폴더/default.tsx'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}