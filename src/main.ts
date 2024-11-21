import { HttpClient } from "./client.ts";
import { RequestError } from "./error.ts";
import { setTimeout } from "timers/promises";

export class ApiRequestor {
  static async request(method: string, url: string, params: any): Promise<any> {
    /**
     * 执行请求
     * @param method 请求方式
     * @param url 请求地址
     * @param params 请求参数
     * @return 返回响应结果
     */
    let retryCount = 0;
    while (true) {
      retryCount += 1;
      const response = await this.requestRaw(method, url, params);
      const result = this.interpretResponse(response);
      if (result) {
        return result;
      } else if (retryCount === jeepay.maxNetworkRetries) {
        throw new RequestError(`HTTP response code was ${response.status}`);
      } else {
        console.log(`第${retryCount}次执行`);
        await setTimeout(jeepay.networkRetryDelay);
      }
    }
  }

  static async requestRaw(
    method: string,
    url: string,
    params: any
  ): Promise<Response> {
    /**
     * 处理请求信息
     * @param method 请求方式
     * @param url 请求地址
     * @param params 请求参数
     * @return 返回响应信息
     */
    if (["GET", "DELETE", "POST", "PUT"].includes(method)) {
      try {
        return await HttpClient.request(method, url, params);
      } catch (e: any) {
        throw new RequestError(`Invalid Request ${e.message}`);
      }
    } else {
      throw new RequestError(`Invalid request method ${method}`);
    }
  }

  static interpretResponse(response: Response): any {
    /**
     * 处理响应信息
     * @param response 响应
     * @return 返回响应结果
     */
    const rCode = response.status;
    if (rCode === 502 && jeepay.badGatewayMatch) {
      return null;
    } else if (rCode === 200) {
      try {
        const rResult = response.json();
        if (rResult.code === 0 && rResult.msg === "SUCCESS") {
          return rResult;
        } else {
          throw new RequestError(
            `Invalid response body from API: ${rResult.msg} (HTTP response code was ${rResult.code})`
          );
        }
      } catch (e: any) {
        throw new RequestError(`Invalid response body from API: ${e.message}`);
      }
    } else {
      throw new RequestError(`HTTP response code was ${rCode}`);
    }
  }
}
