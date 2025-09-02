export interface PaymentRequest {
  amount: number;
  currency?: string;
}

export interface PaymentResponse {
  payment_intent_id: string;
  client_secret: string;
  next_action: NextAction;
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
