// eslint-disable-next-line no-restricted-imports
import mixpanelBrowser, { Dict } from 'mixpanel-browser'
import { usePageContext } from '~/renderer/usePageContext'
import { getQueryParameters } from '../utils/routing'
import { AnalyticsEvent } from '../utils/analyticsEvents'

const mixpanelKey = import.meta.env.VITE_MIXPANEL_PUBLIC_KEY

if (mixpanelKey) {
  mixpanelBrowser.init(mixpanelKey, {
    api_host: '/mp',
    ip: true,
    ignore_dnt: true, // ignore browser's do not track setting
  })
}

interface MixpanelInstance {
  getDistinctId: () => string
  identify: (id: string) => void
  reset: () => void
  track: (event: AnalyticsEvent, props?: Dict) => void
  trackPageView: () => void
  people: {
    set: (props: Dict) => void
  }
}

const disabledMixpanel: MixpanelInstance = {
  getDistinctId: () => '',
  identify: () => null,
  reset: () => null,
  track: () => null,
  trackPageView: () => null,
  people: { set: () => null },
}

export const useMixpanel = (): MixpanelInstance => {
  const pageContext = usePageContext()

  const track = (event: AnalyticsEvent, props?: Dict) => {
    mixpanelBrowser.track(event, {
      ...props,
      url: window.location.pathname,
      route: pageContext.route,
      routeParams: pageContext.routeParams,
      queryParams: getQueryParameters(),
    })
  }
  return mixpanelKey
    ? {
        getDistinctId: () => mixpanelBrowser.get_distinct_id(),
        identify: (id: string) => {
          mixpanelBrowser.identify(id)
        },
        reset: () => {
          mixpanelBrowser.reset()
        },
        track,
        trackPageView: () => {
          track('page viewed')
        },
        people: {
          set: (props: Dict) => {
            mixpanelBrowser.people.set(props)
          },
        },
      }
    : disabledMixpanel
}
