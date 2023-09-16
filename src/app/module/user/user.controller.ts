import { Request, Response } from 'express'
import userService from './user.services'

export const createUser = async (req: Request, res: Response) => {
  const { user } = req.body
  console.log('user-reqbody', user)

  try {
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      // error: error.message // Include the error message in the response
    })
  }
}
