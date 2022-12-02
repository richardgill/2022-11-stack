import { Link } from '~/components/link'
import { trpcReact } from '~/utils/trpc'

export const Page = () => {
  const { data: adminStuff } = trpcReact.admin.getAdminStuff.useQuery()
  return (
    <div>
      Admin Stuff!<Link href="/admin/clientSide">Client Admin</Link>
      {JSON.stringify(adminStuff)}
    </div>
  )
}

export const documentProps = { title: 'Taxpal: Admin page' }
export const requiresAdmin = true
