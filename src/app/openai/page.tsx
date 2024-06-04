'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { createChatCompletion } from '../actions/openai-action'
import { createRequestData } from '@/utils/openai-util'
import { printLog } from '@/utils/log-util'

/**
 * 요청 데이터 타입 정의.
 */
// type RequestData =
//   | {
//       model: string
//       messages: { role: string; content: string }[]
//       temperature: number
//       max_tokens: number
//       top_p: number
//       frequency_penalty: number
//       presence_penalty: number
//     }
//   | undefined

/**
 * 응답 데이터 타입 정의.
 */
type ResponseData =
  | {
      choices: {
        message: {
          content: string
        }
      }[]
    }
  | undefined

const TAG = 'OpenAIPage'

/**
 * OpenAI 테스트 페이지.
 */
const OpenAIPage = () => {
  const [userInput, setUserInput] = useState('')
  const [responseData, setResponseData] = useState<ResponseData>(undefined)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  )

  /**
   * 사용자 입력 제출 시, messages 배열에 추가.
   */
  const handleChatCompletion = async () => {
    if (!userInput) {
      printLog(TAG, 'handleChatCompletion. User input is empty, return.')
      return
    }
    const newMessage = { role: 'user', content: userInput }
    setMessages([...messages, newMessage])

    const requestData = createRequestData(messages)
    console.log(requestData)
    return

    const response = await createChatCompletion(requestData)
    setResponseData(response)
    console.log('🚀 ~ handleChatCompletion ~ response:', response)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  return (
    <div className="px-5 py-16">
      <h1>OpenAI API 테스트를 위한 페이지</h1>
      <br />

      {/* 사용자 입력 */}
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

      {/* 대화 생성 */}
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleChatCompletion}
      >
        Create chat completion
      </button>

      {/* 사용자 입력 조회 */}
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => console.log(userInput)}
      >
        Show user input
      </button>

      {/* 메시지 배열 조회 */}
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => console.log(messages)}
      >
        Show messages
        <span className="inline-flex items-center justify-center px-1 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
          {messages.length}
        </span>
      </button>
      <br />
      <br />

      {/* AI 상담사의 응답 */}
      <label
        htmlFor="response"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        AI's Response
      </label>
      <textarea
        id="response"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="블랜딩 AI 상담사의 답변..."
        value={responseData && responseData.choices[0].message.content}
        disabled
      ></textarea>
    </div>
  )
}

export default OpenAIPage
