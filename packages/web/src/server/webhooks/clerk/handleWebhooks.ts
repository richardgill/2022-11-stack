import { type User } from '@prisma/client'
import { prisma } from '~/server/utils/prisma'

const dataToUser = (data: any): User => {
  return {
    id: data.id,
    createdAt: new Date(data.created_at),
    email: data.email_addresses[0].email_address,
    profileImage: data.profile_image_url,
    updatedAt: new Date(data.updated_at),
  }
}

export const handleWebhooks = async (payload: any) => {
  if (['user.created', 'user.updated'].includes(payload.type)) {
    const user = dataToUser(payload.data)
    await prisma.user.upsert({
      where: {
        id: payload.data.id,
      },
      create: user,
      update: user,
    })
  }
}
