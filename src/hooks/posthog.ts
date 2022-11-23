// eslint-disable-next-line no-restricted-imports
import posthog, { Properties } from 'posthog-js'
import { usePageContext } from '~/renderer/usePageContext'
import { getQueryParameters } from '../utils/routing'
import { AnalyticsEvent } from '../utils/analyticsEvents'

const posthogKey = import.meta.env.VITE_POSTHOG_PUBLIC_KEY

if (posthogKey && typeof window !== 'undefined') {
  posthog.init(posthogKey, {
    api_host: '/ph',
    ip: true,
  })
}

interface PosthogInstance {
  getDistinctId: () => string
  identify: (id: string) => void
  reset: () => void
  capture: (event: AnalyticsEvent, props?: Properties) => void
  capturePageView: () => void
  people: {
    set: (props: Properties) => void
  }
}

const disabledPosthog: PosthogInstance = {
  getDistinctId: () => '',
  identify: () => null,
  reset: () => null,
  capture: () => null,
  capturePageView: () => null,
  people: { set: () => null },
}

export const usePosthog = (): PosthogInstance => {
  const pageContext = usePageContext()

  const capture = (event: AnalyticsEvent, props?: Properties) => {
    posthog.capture(event, {
      ...props,
      url: window.location.pathname,
      route: pageContext.route,
      routeParams: pageContext.routeParams,
      queryParams: getQueryParameters(),
    })
  }
  return posthogKey
    ? {
        getDistinctId: () => posthog.get_distinct_id(),
        identify: (id: string) => {
          posthog.identify(id)
        },
        reset: () => {
          posthog.reset()
        },
        capture,
        capturePageView: () => {
          capture('page viewed')
        },
        people: {
          set: (props: Properties) => {
            posthog.people.set(props)
          },
        },
      }
    : disabledPosthog
}
