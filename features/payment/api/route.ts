import { NextRequest, NextResponse } from 'next/server';
import { CreatePaymentIntentUseCase } from 'features/payment/api/use-cases/create-payment-intent';
import { AirwallexAuthService } from 'features/payment/api/infrastructure/services/airwallex-auth-service';
import { PaymentIntentService } from 'features/payment/api/infrastructure/services/payment-intent-service';
import { PaymentRequest } from 'features/payment/api/entities/types';
import { routeErrorLogger } from 'shared/lib';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/payment';
  const method = 'POST';

  try {
    // 1. 요청 데이터 파싱
    const body: PaymentRequest = await request.json();
    const { amount, currency = 'USD' } = body;

    // 2. 입력 검증
    if (!amount || amount <= 0) {
      const invalidAmountError = new Error('Invalid amount provided');
      const requestId = routeErrorLogger.logError({
        error: invalidAmountError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'INVALID_AMOUNT',
          message: 'Invalid amount provided',
          requestId,
        },
        { status: 400 },
      );
    }

    // 3. 의존성 주입을 통한 인스턴스 생성
    const authService = new AirwallexAuthService();
    const paymentIntentService = new PaymentIntentService();
    const createPaymentIntentUseCase = new CreatePaymentIntentUseCase(
      authService,
      paymentIntentService,
    );

    // 4. Use Case 실행
    const result = await createPaymentIntentUseCase.execute({
      amount,
      currency,
    });

    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'PAYMENT_INTENT_CREATION_FAILED',
        message: 'Failed to create payment intent',
        requestId,
      },
      { status: 500 },
    );
  }
}
