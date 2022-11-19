import { PageContext } from '~/renderer/types'

export const doesRequireAuth = (pageContext: PageContext) =>
  [true, undefined].includes(pageContext.exports.requiresAuth)
