class ApiResponse {
  constructor(statusCode, messgae = 'success', data) {
    this.statusCode = statusCode;
    this.success = statusCode < 400
    this.messgae = messgae;
    this.data = data;
  }
}

export { ApiResponse }