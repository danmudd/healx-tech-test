import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { injectable } from "inversify";
import {
  HttpMethod,
  IHttpRequest,
  IHttpService,
} from "./http-service-interface";

@injectable()
class HttpService implements IHttpService {
  private instance: AxiosInstance;
  private BASE_URL =
    "https://6ztu8769e9.execute-api.eu-west-1.amazonaws.com/dmudd/pubmed/";

  constructor() {
    this.instance = Axios.create({});
  }

  public async [HttpMethod.GET](
    request: IHttpRequest,
    headers?: any
  ): Promise<AxiosResponse<any>> {
    return this.makeRequest(request, HttpMethod.GET, headers);
  }

  public async [HttpMethod.POST](
    request: IHttpRequest,
    headers?: any
  ): Promise<AxiosResponse<any>> {
    return this.makeRequest(request, HttpMethod.POST, headers);
  }

  public async [HttpMethod.DELETE](
    request: IHttpRequest,
    headers?: any
  ): Promise<AxiosResponse<any>> {
    return this.makeRequest(request, HttpMethod.DELETE, headers);
  }

  private async makeRequest(
    request: IHttpRequest,
    method: HttpMethod,
    headers?: any
  ) {
    return this.instance.request({
      baseURL: request.baseUrl,
      url: request.url,
      method,
      params: request.params,
      data: request.payload,
      headers,
    });
  }
}

export { HttpService };
