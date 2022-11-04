import { last } from 'lodash'
import React from 'react'
import { PageContext } from '~/renderer/types'
import { Starship, StarshipResponse } from './types'

const delay = async (time: number) =>
  await new Promise((resolve) => setTimeout(resolve, time))

export const onBeforeRender = async (pageContext: PageContext) => {
  const response = await fetch(
    `https://swapi.dev/api/starships/${pageContext.routeParams.id}`
  )
  const { name, passengers, url }: StarshipResponse = await response.json()

  await delay(2000)
  console.log('starship', { name, passengers, url })
  // `movies` will be serialized and passed to the browser; we select only the data we
  // need in order to minimize what is sent to the browser.

  // We make `movies` available as `pageContext.pageProps.movies`
  const pageProps = {
    starship: {
      name,
      passengers,
      id: last(url.slice(0, -1).split('/')),
    },
  }
  return {
    pageContext: {
      pageProps,
    },
  }
}

export const Page: React.FC<{ starship: Starship }> = ({ starship }) => {
  return (
    <div>
      <h1>{`This Starship, made to fly`}</h1>
      <div>
        {starship.name} - {starship.passengers}
      </div>
    </div>
  )
}
