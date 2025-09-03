export interface PaymentRequest {
  amount: number;
  currency?: string;
  requestUrl: string;
}

// 카드 정보 타입
export interface CardInfo {
  expiry_month: string;
  expiry_year: string;
  name: string;
  bin: string;
  last4: string;
  brand: string;
  issuer_country_code: string;
  card_type: string;
  fingerprint: string;
  issuer_name: string;
  is_commercial: boolean;
  number_type: string;
  card_updater_info: {
    number_updated: boolean;
    expiry_updated: boolean;
  };
}

// 결제 수단 타입
export interface PaymentMethod {
  type: string;
  card: CardInfo;
}

// 인증 데이터 타입
export interface AuthenticationData {
  ds_data: {
    retry_count_for_auth_decline: number;
  };
  fraud_data: {
    action: string;
    score: string;
    risk_factors: string[];
  };
  avs_result: string;
  cvc_result: string;
  cvc_code: string;
}

// 결제 수단 옵션 타입
export interface PaymentMethodOptions {
  card: {
    authorization_type: string;
  };
}

// 디바이스 데이터 타입
export interface DeviceData {
  device_id: string;
  ip_address: string;
  screen_height: number;
  screen_width: number;
  screen_color_depth: number;
  language: string;
  timezone: string;
  browser: {
    java_enabled: boolean;
    javascript_enabled: boolean;
    user_agent: string;
  };
}

// 최신 결제 시도 타입
export interface LatestPaymentAttempt {
  id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  merchant_order_id: string;
  payment_intent_id: string;
  status: string;
  provider_transaction_id: string;
  payment_method_transaction_id: string;
  provider_original_response_code: string;
  authorization_code: string;
  captured_amount: number;
  refunded_amount: number;
  created_at: string;
  updated_at: string;
  settle_via: string;
  authentication_data: AuthenticationData;
  payment_method_options: PaymentMethodOptions;
  device_data: DeviceData;
}

// 결제 인텐트 응답 타입 (실제 API 응답 구조)
export interface PaymentIntentResponse {
  latest_payment_attempt: LatestPaymentAttempt;
  id: string;
  request_id: string;
  amount: number;
  currency: string;
  merchant_order_id: string;
  descriptor: string;
  status: string;
  captured_amount: number;
  created_at: string;
  updated_at: string;
  client_secret: string;
  return_url: string;
  original_amount: number;
  original_currency: string;
}

// 기존 타입들 (하위 호환성을 위해 유지)
export interface PaymentIntentData {
  id: string;
  request_id: string;
  amount: number;
  currency: string;
  merchant_order_id: string;
  descriptor: string;
  status: string;
  captured_amount: number;
  created_at: string;
  updated_at: string;
  client_secret: string;
  return_url: string;
  original_amount: number;
  original_currency: string;
}

export interface PaymentResponse {
  success: boolean;
  data: PaymentIntentData;
}

export interface AirwallexAuthResponse {
  token: string;
}

export interface PaymentIntentRequest {
  request_id: string;
  amount: number;
  currency: string;
  merchant_order_id: string;
  return_url: string;
}

export interface NextAction {
  type: string;
  url?: string;
  data?: Record<string, unknown>;
}
