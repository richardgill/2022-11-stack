import qs from 'query-string'

export const getQueryParameters = () => {
  return qs.parseUrl(window.location.href).query
}

export const getQueryParameter = (queryParam: string) => {
  return qs.parseUrl(window.location.href).query[queryParam]
}

export const getQueryParameterString = (queryParam: string) => {
  return qs.parseUrl(window.location.href).query[queryParam]?.toString()
}

export const pageIdToRoute = (pageId: string) =>
  pageId
    .replace('/src/pages', '')
    .replace(/\/index$/, '')
    .replace(/^\/index$/, '/') // this fixes the route: "/index" which should be: "/"
