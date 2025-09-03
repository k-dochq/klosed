import { PaymentIntentRequest, PaymentResponse } from '../../entities/types';
import { apiRequest } from 'shared/lib';

export class PaymentIntentService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.AIRWALLEX_BASE_URL!;
  }

  async createPaymentIntent(
    accessToken: string,
    request: PaymentIntentRequest,
  ): Promise<PaymentResponse> {
    const response = await apiRequest(`${this.baseUrl}/api/v1/pa/payment_intents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return response.json();
  }
}
