'use client'

import { sendSMS } from '../actions/vonage'

/**
 * [Blending] 콜센터 ARS 테스트 페이지.
 */
const ARSPage = () => {
  return (
    <main className="p-5">
      <h3>ARS 테스트 페이지</h3>
      <br />

      {/* 단순 API 테스트 */}
      {/* <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => sendSMS('821052844463', 'Vonage APIs', 'text')}
      >
        Vonage: 메시지 발신
      </button> */}
    </main>
  )
}

export default ARSPage

/**

 */
