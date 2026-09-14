export const sendResponse = (res, statusCode, data = null, error = null) => {
  const success = statusCode >= 200 && statusCode < 300;
  return res.status(statusCode).json({
    success,
    data,
    error,
  });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  sendResponse(res, statusCode, null, {
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
