import { User } from './user.model'
export const getLastUserId = async () => {
  const lastUserId = await User.findOne().sort({ createdAt: -1 }).lean()

  return lastUserId?.id
}
// Function to generate a new 5-digit user ID
export const generateUserID = async () => {
  const currentUserId =
    (await getLastUserId()) || (0).toString().padStart(5, '0')
  const incrementedId = (parseInt(currentUserId, 10) + 1)
    .toString()
    .padStart(5, '0')

  return incrementedId
}
