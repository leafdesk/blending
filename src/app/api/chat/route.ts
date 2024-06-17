import { NextRequest, NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const docClient = DynamoDBDocumentClient.from(client)

/**
 * 대화 세션 저장.
 */
const saveChatSession = async (
  sessionId: string,
  userPhoneNumber: string,
  messages: string,
  startTime: string,
  endTime: string,
  sessionStatus: string
) => {
  const params = {
    TableName: 'ChatSessions',
    Item: {
      SessionId: sessionId,
      UserPhoneNumber: userPhoneNumber,
      Messages: messages,
      StartTime: startTime,
      EndTime: endTime,
      SessionStatus: sessionStatus,
    },
  }
  try {
    const data = await docClient.send(new PutCommand(params))
    console.log('🚀 ~ data:', data)
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}

/**
 * 대화 세션 업데이트.
 */
const updateChatSession = async (
  sessionId: string,
  userPhoneNumber: string,
  messages: string,
  startTime: string,
  endTime: string,
  sessionStatus: string
) => {
  const params = {
    TableName: 'ChatSessions',
    Key: {
      SessionId: sessionId,
      // UserPhoneNumber: userPhoneNumber,
    },
    UpdateExpression: 'set Messages = :m, EndTime = :e, SessionStatus = :s',
    ExpressionAttributeValues: {
      ':m': messages,
      ':e': endTime,
      ':s': sessionStatus,
    },
  }
  try {
    const data = await docClient.send(new UpdateCommand(params))
    console.log('🚀 ~ data:', data)
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}

/**
 * 대화 세션 가져오기.
 */
export const getChatSession = async (
  sessionId: string
  // userPhoneNumber: string
) => {
  const params = {
    TableName: 'ChatSessions',
    Key: {
      SessionId: sessionId,
      // UserPhoneNumber: userPhoneNumber,
    },
  }
  try {
    const data = await docClient.send(new GetCommand(params))
    if (data.Item) {
      return JSON.parse(data.Item.Messages)
    } else {
      return null
    }
  } catch (error) {
    console.log('🚀 ~ getChatSession ~ error:', error)
    return null
  }
}

/**
 * POST /api/chat 요청.
 */
export async function POST(request: NextRequest) {
  const sessionId = 'session-uuid'
  const userPhoneNumber = '+821099990000'
  const messages = JSON.stringify([{ role: 'user', content: '메시지 내용' }])
  const startTime = '20240601130000'
  const endTime = '20240601131000'
  const sessionStatus = '세션 상태 변경!'

  const existingSession = await getChatSession(sessionId)
  console.log('existingSession:', existingSession)

  if (existingSession) {
    await updateChatSession(
      sessionId,
      userPhoneNumber,
      messages,
      startTime,
      endTime,
      sessionStatus
    )
  } else {
    await saveChatSession(
      sessionId,
      userPhoneNumber,
      messages,
      startTime,
      endTime,
      sessionStatus
    )
  }

  return NextResponse.json({ ok: true })
}
