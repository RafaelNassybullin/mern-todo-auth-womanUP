export default class ApiError extends Error {
  status;
  constructor(status: number, message: string) {
    super(message)
    this.status = status;
  }
  static UnauthorizedError(message: string) {
    return new ApiError(401, message);
  }
  static BadRequest(message: string) {
    return new ApiError(400, message);
  }
};
