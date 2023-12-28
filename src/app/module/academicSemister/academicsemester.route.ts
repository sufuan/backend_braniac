import express from 'express'

// import { createUser } from './user.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../../../middleware/validateRequest'
import {
  academicSemesterController,
  createAcademicSemester,
} from './academicsemester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  // validateRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
  createAcademicSemester,
)

export default router
