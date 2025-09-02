import {
  PaymentRequest,
  PaymentIntentRequest,
  PaymentResponse,
} from 'features/payment/api/entities/types';
import { AirwallexAuthService } from 'features/payment/api/infrastructure/services/airwallex-auth-service';
import { PaymentIntentService } from 'features/payment/api/infrastructure/services/payment-intent-service';

export class CreatePaymentIntentUseCase {
  constructor(
    private authService: AirwallexAuthService,
    private paymentIntentService: PaymentIntentService,
  ) {}

  async execute(request: PaymentRequest): Promise<PaymentResponse> {
    // 1. Airwallex 인증 토큰 발급
    const accessToken = await this.authService.authenticate();

    // 2. 결제 의도 생성 요청 데이터 준비
    const paymentIntentRequest: PaymentIntentRequest = {
      request_id: `req_${Date.now()}`,
      amount: request.amount,
      currency: request.currency || 'USD',
      merchant_order_id: `order_${Date.now()}`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/return`,
    };

    // 3. 결제 의도 생성
    const paymentResponse = await this.paymentIntentService.createPaymentIntent(
      accessToken,
      paymentIntentRequest,
    );

    return paymentResponse;
  }
}
