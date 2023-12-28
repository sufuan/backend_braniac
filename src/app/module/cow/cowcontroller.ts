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
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'asc',
      minPrice,
      maxPrice,
      location,
      searchTerm,
    } = req.query

    // Build filter object based on query parameters
    const filters: any = {}

    if (minPrice) filters.price = { $gte: parseInt(minPrice as string, 10) }
    if (maxPrice)
      filters.price = {
        ...filters.price,
        $lte: parseInt(maxPrice as string, 10),
      }
    if (location) filters.location = location
    if (searchTerm) {
      filters.$or = [
        { location: new RegExp(searchTerm, 'i') },
        { breed: new RegExp(searchTerm, 'i') },
        { category: new RegExp(searchTerm, 'i') },
      ]
    }

    // Create the sort object based on provided sortBy and sortOrder
    const sort: any = {}
    if (sortBy && sortOrder) {
      sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1
    }

    // Fetch cows from the database with pagination and sorting
    const result = await Cow.find(filters)
      .sort(sort)
      .skip((parseInt(page as string, 10) - 1) * parseInt(limit as string, 10))
      .limit(parseInt(limit as string, 10))

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Cows retrieved successfully',
      meta: {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      },
      data: result,
    })
  } catch (error) {
    console.error('Error retrieving cows:', error)
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      data: null,
    })
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
