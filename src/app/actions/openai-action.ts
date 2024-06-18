'use server' // 없으면 Authorization 실패(401).

import axios from 'axios'

const CHAT_COMPLETIONS_API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Chat Completion.
 */
export const createChatCompletion = async (requestData: any) => {
  try {
    const response = await axios.post(CHAT_COMPLETIONS_API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch description from OpenAI API')
  }
}
