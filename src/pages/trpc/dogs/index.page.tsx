import React from 'react'
import { DashboardShell } from '~/components/shells/dashboardShell'
import { trpcReact } from '~/utils/trpc'

export const Page: React.FC = () => {
  const trpcContext = trpcReact.useContext()
  const {
    data: dogs,
    isLoading,
    isRefetching,
    refetch,
  } = trpcReact.dogs.getAll.useQuery()
  const { mutate: createDog } = trpcReact.dogs.create.useMutation({
    onSuccess: async () => {
      await trpcContext.dogs.getAll.invalidate()
    },
  })
  console.log('dogs', dogs)
  return (
    <DashboardShell>
      <h1>{`Users, were mean't to buy`}</h1>
      <div>
        <button onClick={() => refetch()}>Refetch</button>
        {isLoading || (isRefetching && <div>Loading...</div>)}
        {dogs?.map(({ name, createdAt }) => (
          <a key={`${createdAt}`} href={`/trpc/dogs/${createdAt}`}>
            <div>{`${createdAt} - ${name}`}</div>
          </a>
        ))}
      </div>
      <button onClick={() => createDog({ name: `Kiwi ${Math.random()}` })}>
        Create new dog
      </button>
    </DashboardShell>
  )
}

export const doNotPrerender = false
