import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.message.includes('blacklisted')) {
    return res.status(403).json({
      error: 'Forbidden',
      message: err.message
    });
  }

  if (err.message.includes('not found')) {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message
    });
  }

  if (err.message.includes('Insufficient funds') || 
      err.message.includes('Invalid amount') || 
      err.message.includes('credentials') ||
      err.message.includes('transfer to yourself')) {
    return res.status(400).json({
      error: 'Bad Request',
      message: err.message
    });
  }

  // Handle authentication errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token'
    });
  }

  // Default to 500 for other errors
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
};