import { useQuery } from '@tanstack/react-query'
import { last } from 'lodash'
import React from 'react'
import {
  Starship,
  StarshipResponse,
} from '~/pages/star-wars-ssr/starships/types'

const delay = async (time: number) =>
  await new Promise((resolve) => setTimeout(resolve, time))

const fetchStarships = async (): Promise<Starship[]> => {
  const response = await fetch('https://swapi.dev/api/starships')
  const starships: StarshipResponse[] = (await response.json()).results

  await delay(2000)

  return starships.map(({ name, passengers, url }) => ({
    name,
    passengers,
    id: last(url.slice(0, -1).split('/')) ?? '',
  }))
}

export const onBeforeRender = async () => {
  const pageProps = {
    initialStarships: await fetchStarships(),
  }
  return {
    pageContext: {
      pageProps,
    },
  }
}

export const Page: React.FC<{ initialStarships: Starship[] }> = ({
  initialStarships,
}) => {
  const {
    data: starships,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Starship[]>({
    queryKey: ['starships'],
    queryFn: fetchStarships,
    initialData: initialStarships,
  })

  return (
    <div>
      <h1>{`Starships, were mean't to fly`}</h1>
      <div>
        <button onClick={() => refetch()}>Refetch</button>
        {isLoading || (isRefetching && <div>Loading...</div>)}
        {starships?.map(({ name, passengers, id }) => (
          <a key={id} href={`/star-wars-ssr/starships/${id}`}>
            <div>
              {name} - {passengers}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
