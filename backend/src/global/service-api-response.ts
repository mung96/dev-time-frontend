export class ServiceApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data: T): ServiceApiResponse<T>;
  static success(message: string): ServiceApiResponse<null>;

  static success<T>(message: string, data?: T): ServiceApiResponse<T> {
    // return new ServiceApiResponse(true, message, data);
    return { success: true, message, ...data };
  }

  static fail<T>(message: string, data?: T): ServiceApiResponse<T> {
    // return new ServiceApiResponse(true, message, data);
    return { success: false, message, ...data };
  }
}
