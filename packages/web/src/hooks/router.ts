import { pick } from 'lodash-es'
import { usePageContext } from '~/renderer/usePageContext'

export const useRouter = () => {
  const pageContext = usePageContext()
  return {
    ...pick(pageContext, 'route', 'routeParams'),
    query: pageContext?.urlParsed?.search ?? {},
  }
}
