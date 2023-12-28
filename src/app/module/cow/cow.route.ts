import express from 'express'
import { cowController } from './cowcontroller'
import { cowValidation } from './cowvalidation'
import validateRequest from '../../../middleware/validateRequest'

const router = express.Router()

router.post(
  '/cows',
  validateRequest(cowValidation.cowZodSchema),
  cowController.createCow,
)

router.get('/cows', cowController.getAllCows)
router.get('/cows/:id', cowController.getSingleCow)
router.delete('/cows/:id', cowController.deleteCow)

router.patch(
  '/cows/:id',
  //   validateRequest(UpdateUserValidation.UpdateuserZodSchema),
  cowController.updateCow,
)

export default router
