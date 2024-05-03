'use server'

import { Vonage } from '@vonage/server-sdk'

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
})

/**
 * [Vonage] SMS 전송. (단순 API 테스트를 위함)
 */
export const sendSMS = async (to, from, text) => {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log('Message sent successfully')
      console.log(resp)
    })
    .catch((err) => {
      console.log('There was an error sending the messages.')
      console.error(err)
    })
}
