import { last } from 'lodash-es'
import React from 'react'
import { Starship, StarshipResponse } from './types'

const delay = async (time: number) =>
  await new Promise((resolve) => setTimeout(resolve, time))

export const onBeforeRender = async () => {
  const response = await fetch('https://swapi.dev/api/starships')
  const starships: StarshipResponse[] = (await response.json()).results

  await delay(2000)
  // `movies` will be serialized and passed to the browser; we select only the data we
  // need in order to minimize what is sent to the browser.

  // We make `movies` available as `pageContext.pageProps.movies`
  const pageProps = {
    starships: starships.map(({ name, passengers, url }) => ({
      name,
      passengers,
      id: last(url.slice(0, -1).split('/')),
    })),
  }
  return {
    pageContext: {
      pageProps,
    },
  }
}

export const Page: React.FC<{ starships: Starship[] }> = ({ starships }) => {
  return (
    <>
      <h1>{`Starships, were mean't to fly`}</h1>
      <div>
        {starships.map(({ name, passengers, id }) => (
          <a key={id} href={`/star-wars-ssr/starships/${id}`}>
            <div>
              {name} - {passengers}
            </div>
          </a>
        ))}
      </div>
    </>
  )
}

export const doNotPrerender = true
export const requiresAuth = false
