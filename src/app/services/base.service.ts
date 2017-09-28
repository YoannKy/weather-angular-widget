export class BaseService {

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
