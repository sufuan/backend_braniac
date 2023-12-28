import { ZodError } from 'zod'

export function zodErrorHandler(error: ZodError) {
  //   const statusCode = 400 // You can adjust this based on your needs
  //   const message = 'Validation error'

  error.issues.map(issue => {
    path: issue.path
    message: issue.message
  })

  //   return {
  //     statusCode,
  //     message,
  //     errors,
  //   }
}
