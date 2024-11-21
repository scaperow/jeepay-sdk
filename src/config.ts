export type Values = {
  api_base: string;
  version: string;
  mch_no?: string;
  app_id?: string;
  api_key?: string;
};

const _values: Values = {
  api_base: "http://pay.d.jeepay.vip",
  version: "1.0",
};

export  class AppConfig {
  static getBase(): string {
    return _values.api_base;
  }

  static setMchNo(mchNo: string): void {
    _values.mch_no = mchNo;
  }

  static getMchNo(): string | undefined {
    return _values.mch_no;
  }

  static setAppId(appId: string): void {
    _values.app_id = appId;
  }

  static getAppId(): string | undefined {
    return _values.app_id;
  }

  static setApiKey(apiKey: string): void {
    _values.api_key = apiKey;
  }

  static getApiKey(): string | undefined {
    return _values.api_key;
  }

  static setVersion(version: string): void {
    _values.version = version;
  }

  static getVersion(): string {
    return _values.version;
  }
}
