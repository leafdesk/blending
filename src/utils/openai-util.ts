import { printLog } from './log-util'

const TAG = 'openai-util'

/**
 * 요청 데이터 생성.
 */
export const createRequestData = (message: string) => {
  printLog(TAG, `createRequestData. message: ${message}`)

  const EXTRA_STRING = '256 max_tokens 이내로, 한국어 존댓말로 대답해주세요.'

  return {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: message + EXTRA_STRING,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }
}
