import { PaymentIntentRequest, PaymentResponse } from '../../entities/types';

export class PaymentIntentService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.AIRWALLEX_BASE_URL!;
  }

  async createPaymentIntent(
    accessToken: string,
    request: PaymentIntentRequest,
  ): Promise<PaymentResponse> {
    const response = await fetch(`${this.baseUrl}/api/v1/pa/payment_intents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('결제 의도 생성 실패');
    }

    return response.json();
  }
}
