import axios from 'axios'

/**
 * 대화 세션 조회. (세션 아이디로)
 */
export const getChatSession = async (sessionId: string) => {
  try {
    return await axios.get('/api/chat', {
      params: { sessionId },
    })
  } catch (error) {
    console.log('🚀 ~ getChatSession ~ response:', error)
  }
}

/**
 * 대화 세션 업데이트 또는 신규 저장. (upsert: update + insert)
 */
export const upsertChatSession = async () => {
  // 테스트 데이터.
  const sessionId = 'session-uuid'
  const userPhoneNumber = '+821099990000'
  const messages = JSON.stringify([{ role: 'user', content: '메시지 내용' }])
  const startTime = '20240601130000'
  const endTime = '20240601131000'
  const sessionStatus = '변경 3'

  try {
    const response = await axios.post('/api/chat', {
      sessionId,
      userPhoneNumber,
      messages,
      startTime,
      endTime,
      sessionStatus,
    })
    console.log('🚀 ~ upsertChatSession ~ response:', response)
  } catch (error) {
    console.log('🚀 ~ upsertChatSession ~ error:', error)
  }
}
