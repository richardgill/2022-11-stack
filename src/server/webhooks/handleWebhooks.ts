import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

const dataToUser = (data: any): Omit<User, 'id'> => {
  return {
    userId: data.id,
    createdAt: data.created_at,
    email: data.email_addresses[0].email_address,
    profileImage: data.profile_image_url,
    updatedAt: data.updated_at,
  }
}
export const handleWebhooks = async (payload: any) => {
  if (payload.type === 'user.created') {
    await prisma.user.create({ data: dataToUser(payload.data) })
  } else if (payload.type === 'user.updated') {
    await prisma.user.update({
      where: {
        userId: payload.data.id,
      },
      data: dataToUser(payload.data),
    })
  }
}
