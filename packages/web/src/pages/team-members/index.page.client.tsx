import {
  CreateOrganization,
  OrganizationProfile,
  useOrganization,
} from '@clerk/clerk-react'
import { DashboardShell } from '~/components/layouts/dashboardLayout'

export const Page = () => {
  const organization = useOrganization()
  return (
    <DashboardShell>
      {!organization.isLoaded && <div>Loading...</div>}

      {organization.isLoaded &&
        (!organization.organization ? (
          <CreateOrganization />
        ) : (
          <OrganizationProfile />
        ))}
    </DashboardShell>
  )
}

export const requiresAuth = true
export const documentProps = { title: 'Team Members' }
