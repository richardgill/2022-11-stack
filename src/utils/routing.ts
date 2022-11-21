import { parseUrl } from 'query-string'

export const getQueryParameters = () => {
  return parseUrl(window.location.href).query
}

export const getQueryParameter = (queryParam: string) => {
  return parseUrl(window.location.href).query[queryParam]
}

export const getQueryParameterString = (queryParam: string) => {
  return parseUrl(window.location.href).query[queryParam]?.toString()
}

export const pageIdToRoute = (pageId: string) =>
  pageId
    .replace('/src/pages', '')
    .replace(/\/index$/, '')
    .replace(/^\/index$/, '/')
