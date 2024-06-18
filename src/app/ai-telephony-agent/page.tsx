'use client'

import { ChangeEvent, useState } from 'react'

const AITelephonyAgentPage = () => {
  const [userInput, setUserInput] = useState('')

  /**
   * 사용자 입력 변화 시.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value)
  }

  return (
    <div className="px-5 py-16">
      <h1>AI Telephony Agent</h1>
      <br />

      {/* User Input */}
      <div>
        <label
          htmlFor="user_input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          User Input
        </label>
        <input
          type="text"
          id="user_input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="블랜딩 AI 상담사에게 질문하세요!"
          onChange={handleInputChange}
          required
        />
      </div>
      <br />

      {/* 입력 */}
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {}}
      >
        Create chat completion...
      </button>
    </div>
  )
}

export default AITelephonyAgentPage
