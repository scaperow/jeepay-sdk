export class ERROR extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    // Error.captureStackTrace(this, this.constructor);
  }
}

export class RequestError extends ERROR {
  constructor(message?: string) {
    super(message);
  }
}

export class ResponseError extends ERROR {
  constructor(message?: string) {
    super(message);
  }
}

export class APIError extends ERROR {
  constructor(message?: string) {
    super(message);
  }
}

export default { ERROR, RequestError, ResponseError, APIError };
