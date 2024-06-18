'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { createChatCompletion } from '@/app/actions/openai-action'
import { createRequestData } from '@/utils/openai-util'
import { printLog } from '@/utils/log-util'

/**
 * 요청 데이터 타입 정의.
 */
type RequestData =
  | {
      model: string
      messages: { role: string; content: string }[]
      temperature: number
      max_tokens: number
      top_p: number
      frequency_penalty: number
      presence_penalty: number
    }
  | undefined

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
    [
      {
        role: 'system',
        content:
          '256 max_tokens 이내로, 응답이 중간에 끊기지 않도록 완성된 문장으로, 한국어로 답변.',
      },
    ]
  )

  /**
   * 요청이 진행된 후 응답받기 전 상태.
   */
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * 사용자 입력 제출 시, messages 배열에 추가.
   */
  const handleChatCompletion = async () => {
    if (!userInput) {
      printLog(TAG, 'handleChatCompletion. User input is empty, return.')
      return
    }
    setIsLoading(true)
    const newMessage = { role: 'user', content: userInput }
    setMessages([...messages, newMessage])
  }

  /**
   * 만들어진 요청 데이터를 통해 응답 생성.
   */
  const generateChatResponse = async (requestData: RequestData) => {
    console.log('🚀 ~ handleChatCompletion ~ requestData:', requestData)
    const response = await createChatCompletion(requestData)
    console.log('🚀 ~ handleChatCompletion ~ response:', response)

    setMessages([...messages, response.choices[0].message])
    setResponseData(response)
    setIsLoading(false)
  }

  /**
   * 요청으로 인한 messages 배열 증가 시 chat completion 생성.
   */
  useEffect(() => {
    // 요청 시에만 generateChatResponse(createChatCompletion) 진행.
    // 초기 렌더링 시와 응답 시에는 messages 배열에 변화가 생겨도 무시.
    // 아래 방어코드가 없으면 [응답 -> 배열 증가 -> 재 요청] 무한 루프 발생.
    if (!isLoading) {
      printLog(TAG, `useEffect(messages). return. isLoading: ${isLoading}`)
      return
    }
    const requestData = createRequestData(messages)
    console.log('🚀 ~ useEffect ~ requestData:', requestData)
    generateChatResponse(requestData)
  }, [messages])

  /**
   * 사용자 입력 변화 시.
   */
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
