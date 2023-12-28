import express from 'express'

// import { createUser } from './user.controller'
import { createAcademicSemester } from './academicsemester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  // validateRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
  createAcademicSemester,
)

export default router
