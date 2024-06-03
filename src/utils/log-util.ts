const TAG = 'log-util'

/**
 * 로그 출력.
 */
export const printLog = (tag: string, message: string) => {
  console.log(`[${tag}] ${message}`)
}
