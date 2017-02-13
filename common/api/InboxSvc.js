import {get, post} from './utils';
// import * as store from 'store2'

export async function getInbox_API() {
    return await get('/inbox/')
}

export async function getConversation_API(id) {
    return await get(`/inbox/${id}/`)
}

export async function sendConversationMessage_API(id, data) {
    return await post(`/inbox/${id}/message/`, data)
}

export async function acceptConversationQuote_API(id, data) {
    return await post(`/quotes/${id}/`, data)
}
