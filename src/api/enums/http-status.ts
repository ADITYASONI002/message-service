export enum HttpStatus {
  'OK' = 200,
  'Created' = 201,
  'Accepted' = 202,
  'NoContent' = 204,
  'BadRequest' = 400,
  'Unauthorized' = 401,
  'Forbidden' = 403,
  'NotFound' = 404,
  'MethodNotAllowed' = 405, // Added Method Not Allowed
  'Conflict' = 409, // Added Conflict
  'InternalServerError' = 500,
  'NotImplemented' = 501,
  'BadGateway' = 502, // Added Bad Gateway
  'ServiceUnavailable' = 503,
  'GatewayTimeout' = 504, // Added Gateway Timeout
  'VersionNotSupported' = 505, // Added HTTP Version Not Supported
  'UnavailableForLegalReasons' = 451, // Added Unavailable For Legal Reasons
}
