import request from "./request";

export function getIndexerStats() {
  return request("/v1/indexer/stats", {
    method: 'get',
  })
}
