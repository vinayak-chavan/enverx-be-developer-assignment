import { Request, Response } from 'express';

const successResponse = (
  res: Response,
  data: any,
  code: number, 
  message: string,
): Response => {
  return res.send({
    code,
    success: true,
    message,
    data,
  });
};

const errorResponse = (
  res: Response,
  errorMessage: string,
  code: number,
  error = {}
): Response => {
  return res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });
};

export { successResponse, errorResponse };