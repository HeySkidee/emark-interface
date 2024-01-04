import request from "./request";

export function getToken(tick) {
  return request(`/v1/token/${tick}`, {
    method: 'get',
  })
}

export function getTokens(params) {
  return request('/v1/token/tokens', {
    method: 'get',
    params
  })
}

export function getAccounts(params) {
  return request('/v1/token/accounts', {
    method: 'get',
    params
  })
}

export function getTxs(params) {
  return request('/v1/token/txs', {
    method: 'get',
    params
  })
}