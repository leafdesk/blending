'use client'

import { printLog } from '@/utils/log-util'
import axios from 'axios'

const TAG = 'DynamoDBPage'

const DynamoDBPage = () => {
  /**
   * 테스트를 위한 함수.
   */
  const addProduct = async () => {
    try {
      const response = await axios.post('/api/dynamodb')
      console.log('🚀 ~ addProduct ~ response:', response)
    } catch (error) {
      printLog(TAG, `addProduct. error: ${error}`)
    }
  }

  /**
   * 대화 세션 저장.
   */
  const saveChatSession = async () => {
    // 테스트 데이터.
    const sessionId = 'session-uuid'
    const userPhoneNumber = '+821099990000'
    const messages = JSON.stringify([{ role: 'user', content: '메시지 내용' }])
    const startTime = '20240601130000'
    const endTime = '20240601131000'
    const sessionStatus = '변경 2'

    try {
      const response = await axios.post('/api/chat', {
        sessionId,
        userPhoneNumber,
        messages,
        startTime,
        endTime,
        sessionStatus,
      })
      console.log('🚀 ~ saveChatSession ~ response:', response)
    } catch (error) {
      console.log('🚀 ~ saveChatSession ~ error:', error)
    }
  }

  return (
    <div className="px-5 py-16">
      <h1>DynamoDB 테스트를 위한 페이지</h1>
      <br />

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={saveChatSession}
      >
        Save chat session
      </button>
    </div>
  )
}

export default DynamoDBPage
