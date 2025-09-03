import { AirwallexAuthService } from '../infrastructure/services/airwallex-auth-service';
import { PaymentIntentResponse } from '../entities/types';
import { apiRequest } from 'shared/lib';

export class GetPaymentIntentUseCase {
  constructor(private authService: AirwallexAuthService) {}

  async execute(paymentIntentId: string): Promise<PaymentIntentResponse> {
    // 1. Airwallex 인증 토큰 발급
    const accessToken = await this.authService.authenticate();

    // 2. Payment Intent 조회
    const response = await apiRequest(
      `${process.env.AIRWALLEX_BASE_URL}/api/v1/pa/payment_intents/${paymentIntentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch payment intent');
    }

    return response.json();
  }
}
