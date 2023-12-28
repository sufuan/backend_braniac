/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request } from 'express'
const app: Application = express()
import userRoute from './app/module/user/user.route'
import cowroute from './app/module/cow/cow.route'
import semester from './app/module/academicSemister/academicsemester.route'

import cors from 'cors'
import bodyParser from 'body-parser'

import globalErrorHandler from './middleware/globalErrorHandler'
import {} from './app/module/user/user.utils'

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api/v1/', userRoute)
app.use('/api/v1/', cowroute)
app.use('/api/v1/semester/', semester)

class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

//global error handler

app.get('/', (req: Request, res, next: NextFunction) => {
  res.send('Hello World!')

  // const err = new ApiError(401, 'erroor from get home route is working')

  // next(err)
})
app.use(globalErrorHandler) // global error handler

// Handle not found request
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Path not found',
  })
  next
})

app.use(globalErrorHandler) // global error handler))

const academicSemester = {
  title: 'Autumn',
  year: '2025',
  code: '01',
  startMonth: 'January',
  endMonth: 'March',
}

// const testId = async () => {
//   const testId = await generateFacultyID(academicSemester)
//   console.log(testId)
// }
// testId()

export default app
