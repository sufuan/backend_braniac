import { NextFunction, Request, Response } from 'express'
import userService from './user.services'
import User from './user.model'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Received Request Body:', req.body)
  const { ...userData } = req.body

  try {
    const result = await User.create(userData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
    // console.log(error)
  }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find()
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id // Assuming the user ID is in the route parameter

  try {
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id // Assuming the user ID is in the route parameter
  const updatedUserData = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    })

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
}
