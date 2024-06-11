import { NextRequest, NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const docClient = DynamoDBDocumentClient.from(client)

/**
 * 테스트를 위한 함수.
 */
export const addProduct = async () => {
  const params = {
    TableName: 'ChatSessions',
    Item: {
      SessionId: 'Product01',
      description: 'Hiking Boots',
      category: 'footwear',
      sku: 'hiking-sku-01',
      size: 9,
    },
  }
  // GetItem, Query, Scan 시에도 아래와 동일한 패턴.
  try {
    const data = await docClient.send(new PutCommand(params))
    console.log('🚀 ~ addProduct ~ data:', data)
  } catch (error) {
    console.log('🚀 ~ addProduct ~ error:', error)
  }
}

/**
 * POST /api/dynamodb 요청.
 */
export async function POST(request: NextRequest) {
  addProduct()
  return NextResponse.json({ ok: true })
}
