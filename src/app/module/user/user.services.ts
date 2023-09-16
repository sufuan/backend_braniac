import { User } from './user.model'
import { IUser } from './user.interface'
import config from '../../../config/index'
import { generateUserID } from './user.utils'

export const createUser = async (user: IUser) => {
  //atuo generate increment id
  const id = await generateUserID()
  user.id = id
  console.log('userid', id)

  //default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  try {
    const createdUser = await User.create(user)
    return createdUser
  } catch (error) {
    console.error('Error creating user from sr:', error)
    throw error // Re-throw the error
  }
}

export default {
  createUser,
}
