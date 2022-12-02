import { trpcReact } from '~/utils/trpc'

export const Page = () => {
  const { data: adminStuff } = trpcReact.admin.getAdminStuff.useQuery()
  return <div>Admin Stuff!{JSON.stringify(adminStuff)}</div>
}

export const documentProps = { title: 'Taxpal: Admin page' }
export const requiresAdmin = true
