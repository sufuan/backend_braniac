import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { zodErrorHandler } from '../error/zodErrorHandler'

const devError = (res, error) => {
  res.status(error.statusCode).json({
    success: false,
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  })
}

const productionError = (res, error) => {
  res.status(error.statusCode).json({
    success: false,
    status: error.statusCode,
    message: error.message,
  })
}

const validationErrorHandler = (res, error) => {
  const handledError = zodErrorHandler(error)

  // Extracting error details for a more structured response
  const errorDetails = {
    issues: handledError.errors.map(e => ({
      code: e.code,
      expected: e.expected,
      received: e.received,
      path: e.path,
      message: e.message,
    })),
    name: handledError.name,
  }

  res.status(handledError.statusCode).json({
    success: false,
    message: 'Validation Error',
    errorMessage: handledError.message,
    errorDetails,
    stack: error.stack, // Include stack trace if needed
  })
}

const globalErrorHandler = (error, req: Request, res, next: NextFunction) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    devError(res, error)
  } else if (process.env.NODE_ENV === 'production') {
    if (error instanceof ZodError) {
      validationErrorHandler(res, error)
    } else {
      productionError(res, error)
    }
  }
}

export default globalErrorHandler
