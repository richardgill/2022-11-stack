import React from 'react'

interface Starship {
  name: string
  passengers: number
}

const delay = async (time: number) =>
  await new Promise((resolve) => setTimeout(resolve, time))

export const onBeforeRender = async () => {
  const response = await fetch('https://swapi.dev/api/starships')
  let starships: Array<{ name: string; passengers: number }> = (
    await response.json()
  ).results

  await delay(4000)
  console.log('starships', starships)
  // `movies` will be serialized and passed to the browser; we select only the data we
  // need in order to minimize what is sent to the browser.
  starships = starships.map(({ name, passengers }) => ({
    name,
    passengers,
  }))

  // We make `movies` available as `pageContext.pageProps.movies`
  const pageProps = { starships }
  return {
    pageContext: {
      pageProps,
    },
  }
}

export const Page: React.FC<{ starships: Starship[] }> = ({ starships }) => {
  console.log('props', starships)
  return (
    <div>
      <h1>{`Starships, were mean't to fly`}</h1>
      <div>
        {starships.map(({ name, passengers }) => (
          <div key={name}>
            {name} - {passengers}
          </div>
        ))}
      </div>
    </div>
  )
}
