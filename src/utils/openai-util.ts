import { printLog } from './log-util'

const TAG = 'openai-util'

/**
 * GPT 메시지 배열 타입 정의.
 */
export type Messages = {
  role: string
  content: string
}[]

/**
 * 요청 데이터 생성.
 */
export const createRequestData = (messages: Messages) => {
  // create request data w/ user message.

  return {
    model: 'gpt-3.5-turbo',
    messages: messages,
    /**
       * {
        role: 'system',
        content: '256 max_tokens 이내로, 한국어 존댓말로 대답해주세요.',
      },
       */

    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }
}
