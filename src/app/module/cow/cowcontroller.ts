/* eslint-disable @typescript-eslint/no-unused-vars */

import Cow from './cowmodel'

import { Request, Response, NextFunction } from 'express'

async function createCow(req: Request, res: Response) {
  try {
    // Extract cow data from the request body

    // Save the cow to the database
    const result = await Cow.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Cow created successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error creating cow:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    })
  }
}

// export default createCow

// cow.controller.ts

const getAllCows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all cows from the database
    const cows = await Cow.find()

    res.status(200).json({
      success: true,
      message: 'Cows retrieved successfully',
      data: cows,
    })
  } catch (error) {
    console.error('Error retrieving cows:', error)
    next(error)
  }
}

const getSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cowid = req.params.id
  try {
    const cow = await Cow.findById(cowid)

    if (!cow) {
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
      data: cow,
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

const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  const cowid = req.params.id // Assuming the user ID is in the route parameter
  const updateCowdata = req.body

  try {
    const updatedUser = await Cow.findByIdAndUpdate(cowid, updateCowdata, {
      new: true,
    })

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'Cow not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'cow updated successfully',
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

const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  const cowid = req.params.id

  try {
    const deletedCow = await Cow.findByIdAndDelete(cowid)

    if (!deletedCow) {
      res.status(404).json({
        success: false,
        message: 'cow not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'cow deleted successfully',
      data: deletedCow,
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

export const cowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
