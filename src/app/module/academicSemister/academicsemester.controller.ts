// import { NextFunction, Request, Response } from 'express'
// import { AcademicSemesterServices } from './academicsemester.services'

// export const createAcademicSemester = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.log('Received Request Body:', req.body)

//   const { ...academicsemesterData } = req.body

//   try {
//     const result =
//       await AcademicSemesterServices.createAcademicSemester(
//         academicsemesterData,
//       )
//     res.status(200).json({
//       success: true,
//       message: 'semester created successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//     // console.log(error)
//   }
// }

// export const academicSemesterController = {
//   createAcademicSemester,
// }

// controllers/semesterController.ts
import { Request, Response } from 'express'
import { AcademicSemesterServices } from './academicsemester.services'

export const createAcademicSemester = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { ...academicsemesterData } = req.body

  try {
    const result =
      await AcademicSemesterServices.createAcademicSemester(
        academicsemesterData,
      )

    // Respond with the created semester
    res.status(200).json({
      success: true,
      message: 'semester created successfully',
      data: result,
    })
  } catch (error) {
    // Handle errors
    console.error('Error creating semester:', error)
    // res.status(500).json({ error: 'Internal Server Error' })
    // next(error)
  }
}
