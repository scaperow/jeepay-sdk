import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestError } from "./error";

export class HttpClient {
  static async request(
    method: string,
    url: string,
    params: any
  ): Promise<AxiosResponse> {
    try {
      const config: AxiosRequestConfig = {
        method: method as any,
        url: url,
        params: params,
        timeout: requestTimeout
      };

      const response: AxiosResponse = await axios(config);
      return response;
    } catch (e: any) {
      throw new RequestError(`Invalid API Request ${e.message}`);
    }
  }
}

export default HttpClient;
