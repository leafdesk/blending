'use client'

import { getChatSession, upsertChatSession } from '@/services/chat-service'
import { ChangeEvent, useState } from 'react'
import { createChatCompletion } from '../actions/openai-action'
import { createRequestData } from '@/utils/openai-util'

const AITelephonyAgentPage = () => {
  const [userInput, setUserInput] = useState('')

  // 테스트 세션 ID.
  const sessionId = 'session-uuid'

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
        onClick={
          /**
           * 추후 Node.js 환경의 Lambda 함수로 이관 예정.
           */
          async () => {
            // messages 배열 초기화. system 요구 사항.
            // let messages = [
            //   {
            //     role: 'system',
            //     content:
            //       '256 max_tokens 이내로, 응답이 중간에 끊기지 않도록 완성된 문장으로, 한국어로 답변.',
            //   },
            // ]

            // 유저 입력을 받으면, DB에서 Messages 데이터 가져와서, messages 배열에 저장.
            const response = await getChatSession(sessionId)
            const remoteMessages = response?.data.session.Messages
            let messages = remoteMessages
              ? JSON.parse(response?.data.session.Messages)
              : []

            // messages 배열에 유저 입력 push.
            const newMessage = { role: 'user', content: userInput }
            messages.push(newMessage)

            // messages 배열을 ChatGPT API로 전달하고, 받은 응답을 messages 배열에 push.
            const requestData = createRequestData(messages)
            const result = await createChatCompletion(requestData)
            messages.push(result?.choices[0].message)

            // messages 배열 전체를 DB에 업데이트.
            upsertChatSession(
              'session-uuid',
              '+821099990000',
              JSON.stringify(messages),
              '20240601130000',
              '20240601131000',
              '변경 5'
            )

            // AI 상담사의 응답.
            console.log('AI 상담사의 응답:', result?.choices[0].message.content)
          }
        }
      >
        Process Lambda Logic
      </button>
    </div>
  )
}

export default AITelephonyAgentPage
