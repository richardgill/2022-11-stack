import React from 'react'
import { trpcReact } from '~/renderer/trpc'

export const Page: React.FC = () => {
  const trpcContext = trpcReact.useContext()
  const {
    data: users,
    isLoading,
    isRefetching,
    refetch,
  } = trpcReact.userList.useQuery()
  const { mutate: createUser } = trpcReact.userCreate.useMutation({
    onSuccess: async () => {
      await trpcContext.userList.invalidate()
    },
  })
  return (
    <div>
      <h1>{`Starships, were mean't to fly`}</h1>
      <div>
        <button onClick={() => refetch()}>Refetch</button>
        {isLoading || (isRefetching && <div>Loading...</div>)}
        {users?.map(({ name, id }) => (
          <a key={id} href={`/trpc/users/${id}`}>
            <div>
              {id} - {name}
            </div>
          </a>
        ))}
      </div>
      <button onClick={() => createUser({ name: `Richard ${Math.random()}` })}>
        Create new user
      </button>
    </div>
  )
}
