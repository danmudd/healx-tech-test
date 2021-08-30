import { AxiosResponse } from "axios";

enum HttpMethod {
  GET = "get",
  POST = "post",
  DELETE = "delete",
}

interface IHttpService {
  [HttpMethod.GET](
    request: IHttpRequest,
    headers?: any
  ): Promise<AxiosResponse>;
  [HttpMethod.POST](
    request: IHttpRequest,
    headers?: any
  ): Promise<AxiosResponse>;
  [HttpMethod.DELETE](
    request: IHttpRequest,
    headers?: any
  ): Promise<AxiosResponse>;
}

interface IHttpRequest {
  baseUrl?: string;
  url: string;
  payload?: any;
  contentType?: string;
  params?: any;
}

export { HttpMethod, IHttpRequest, IHttpService };
