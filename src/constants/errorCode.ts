const ERROR_CODE = {
  USER_NOT_FOUND: {
    statusCode: 404,
    message: 'User not found',
  },
  USER_ALREADY_EXISTS: {
    statusCode: 409,
    message: 'User already exists',
  },
  USER_NOT_AUTHORIZED: {
    statusCode: 403,
    message: 'User not authorized',
  },
  USER_NOT_AUTHENTICATED: {
    statusCode: 401,
    message: 'User not authenticated',
  },
  FORBIDDEN: {
    statusCode: 403,
    message: 'Forbidden',
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: 'Bad request',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal server error',
  },
  NOT_FOUND: {
    statusCode: 404,
    message: 'Not found',
  },
};

export { ERROR_CODE };
