import crypto from "crypto";
import { AppConfig } from "./config.ts";
import { RequestError } from "./error.ts";

function analysisParams(params: Record<string, any>): Record<string, any> {
  /**
   * 解析请求参数
   * @param params 请求参数
   * @return 返回解析后的参数
   */
  const newDict: Record<string, any> = {};
  const signType = "MD5";
  const timeStamp = Date.now();

  for (const [key, value] of Object.entries(params)) {
    if (value || value === 0) {
      newDict[key] = value;
    }
  }

  newDict["mchNo"] = AppConfig.getMchNo();
  newDict["appId"] = AppConfig.getAppId();
  newDict["reqTime"] = timeStamp;
  newDict["version"] = AppConfig.getVersion();
  newDict["signType"] = signType;
  newDict["sign"] = signatureRules(newDict);

  return { ...params, ...newDict };
}

function signatureRules(dictData: Record<string, any>): string {
  /**
   * 签名规则
   * @param dictData 签名的数据
   * @return 返回加密后的签名
   */
  try {
    const sortedData = Object.entries(dictData).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB)
    );
    let text = "";

    for (const [key, value] of sortedData) {
      text += `${key}=${value}&`;
    }

    text += `key=${AppConfig.getApiKey()}`;
    return md5Encrypt(text);
  } catch (e: any) {
    throw new RequestError(e.message);
  }
}

function md5Encrypt(text: string): string {
  const md5 = crypto.createHash("md5");
  return md5.update(text, "utf-8").digest("hex").toUpperCase();
}

export { analysisParams, signatureRules, md5Encrypt };
