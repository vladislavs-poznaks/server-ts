class UnauthorizedError extends Error {
    status: number = 403

    constructor(message: string) {
        super(message)
    }
  }

  export default UnauthorizedError
