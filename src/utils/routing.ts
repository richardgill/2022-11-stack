import { parseUrl } from 'query-string'

export const getQueryParameter = (queryParam: string) => {
  return parseUrl(window.location.href).query[queryParam]
}

export const getQueryParameterString = (queryParam: string) => {
  return parseUrl(window.location.href).query[queryParam]?.toString()
}
