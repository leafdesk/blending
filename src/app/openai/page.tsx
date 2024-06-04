'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { createChatCompletion } from '../actions/openai-action'
import { createRequestData } from '@/utils/openai-util'

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

/**
 * OpenAI 테스트 페이지.
 */
const OpenAIPage = () => {
  const [requestData, setRequestData] = useState<RequestData>(undefined)
  const [userInput, setUserInput] = useState('')
  const [responseData, setResponseData] = useState<ResponseData>(undefined)

  useEffect(() => {
    const _requestData = createRequestData(userInput)
    setRequestData(_requestData)
  }, [userInput])

  const handleChatCompletion = async () => {
    if (!userInput) {
      console.log('User input is empty')
      return
    }
    console.log('🚀 ~ OpenAIPage ~ requestData:', requestData)

    const response = await createChatCompletion(
      createRequestData(userInput)
      // requestData
    )
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

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleChatCompletion}
      >
        Create chat completion
      </button>

      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => console.log(requestData?.messages[0].content)}
      >
        Check request data
      </button>
      <br />

      <span className="block mt-10">블랜딩 AI 상담사의 답변:</span>
      <br />

      <span>{responseData && responseData.choices[0].message.content}</span>
    </div>
  )
}

export default OpenAIPage
