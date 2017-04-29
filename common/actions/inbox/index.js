import { resultOK } from 'api/utils'
import { getInboxAPI } from 'api/InboxSvc'

// define action types
export const GET_INBOX_SUCCESS = 'GET_INBOX_SUCCESS'
export const GET_INBOX_FAIL = 'GET_INBOX_FAIL'

export const GET_INBOX = async () => {
  let result = await getInboxAPI()
  if (!resultOK(result)) {
    return { type: GET_INBOX_FAIL, error: result.data }
  }
  return { type: GET_INBOX_SUCCESS, result: result.data }
}
