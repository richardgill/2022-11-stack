import React from 'react'
import { trpcReact } from '~/utils/trpc'

export const Page: React.FC = () => {
  const trpcContext = trpcReact.useContext()
  const {
    data: users,
    isLoading,
    isRefetching,
    refetch,
  } = trpcReact.users.getAll.useQuery()
  const { mutate: createUser } = trpcReact.users.create.useMutation({
    onSuccess: async () => {
      await trpcContext.users.getAll.invalidate()
    },
  })
  return (
    <>
      <h1>{`Users, were mean't to buy`}</h1>
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
    </>
  )
}

export const doNotPrerender = false
export const requiresAuth = false
