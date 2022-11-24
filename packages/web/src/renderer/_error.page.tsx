import { Page404 } from '~/components/pages/httpStatus/404'
import { Page500 } from '~/components/pages/httpStatus/500'

const Page = ({ is404 }: { is404: boolean }) => {
  if (is404) {
    return <Page404 />
  } else {
    return <Page500 />
  }
}

export { Page }
