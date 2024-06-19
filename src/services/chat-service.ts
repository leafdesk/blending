import axios from 'axios'

/**
 * ChatSession 타입 정의.
 */
type ChatSession = {
  SessionId: string
  UserPhoneNumber: string
  Messages: string
  StartTime: string
  EndTime: string
  SessionStatus: string
}

/**
 * getChatSession 응답 타입 정의.
 */
type GetChatSessionResponse = {
  data: {
    session: ChatSession
  }
}

/**
 * 대화 세션 조회. (세션 아이디로)
 */
export const getChatSession = async (
  sessionId: string
): Promise<GetChatSessionResponse> => {
  try {
    return await axios.get('/api/chat', {
      params: { sessionId },
    })
  } catch (error) {
    throw new Error('Failed to get chat session')
  }
}

/**
 * 대화 세션 업데이트 또는 신규 저장. (upsert: update + insert)
 */
export const upsertChatSession = async (
  sessionId: string,
  userPhoneNumber: string,
  messages: string,
  startTime: string,
  endTime: string,
  sessionStatus: string
) => {
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
