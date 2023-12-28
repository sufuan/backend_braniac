import express from 'express'
import createCow, { cowController } from './cowcontroller'

const router = express.Router()

router.post(
  '/cow',
  //   validateRequest(UserValidation.userZodSchema),
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
