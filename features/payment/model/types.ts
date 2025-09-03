export interface PaymentRequest {
  amount: number;
  currency?: string;
  requestUrl: string;
}

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

export interface NextAction {
  type: string;
  url?: string;
  data?: Record<string, unknown>;
}
