import { NextRequest, NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
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
      Messages: JSON.stringify(messages),
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
      userPhoneNumber: userPhoneNumber,
    },
    UpdateExpression: 'set Messages = :m, EndTime = :e, SessionStatus = :s',
    ExpressionAttributeValues: {
      ':m': JSON.stringify(messages),
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
 * POST /api/chat 요청.
 */
export async function POST(request: NextRequest) {
  return NextResponse.json({ ok: true })
}
