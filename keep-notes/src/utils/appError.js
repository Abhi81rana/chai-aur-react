
export class AppError extends Error {
  constructor(message, options = {}) {
    super(message);

    this.name = "AppError";
    this.code = options.code || "APP_ERROR";
    this.status = options.status || null;
    this.cause = options.cause || null;
  }
}

export function getErrorMessage(
  error,
  fallback = "Something went wrong."
) {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
