import { LocaleLink } from 'shared/ui/locale-link';
import { GetPaymentIntentUseCase } from 'features/payment/api/use-cases/get-payment-intent';
import { AirwallexAuthService } from 'features/payment/api/infrastructure/services/airwallex-auth-service';
import { PaymentIntentResponse } from 'features/payment/api/entities/types';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  let paymentData: PaymentIntentResponse | null = null;
  let paymentError: string | null = null;

  if (id) {
    try {
      // 의존성 주입을 통한 인스턴스 생성
      const authService = new AirwallexAuthService();
      const getPaymentIntentUseCase = new GetPaymentIntentUseCase(authService);

      // Payment Intent 조회
      paymentData = await getPaymentIntentUseCase.execute(id);
    } catch (error) {
      paymentError = error instanceof Error ? error.message : 'Failed to fetch payment details';
      console.error('Payment intent fetch error:', error);
    }
  }

  return (
    <div className='mx-auto px-4 py-8 font-semibold text-indigo-950'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-6 text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
            <svg
              className='h-8 w-8 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-gray-900'>Payment Successful!</h1>
          <p className='mt-2 text-gray-600'>Your payment has been processed successfully.</p>
        </div>

        {id && (
          <div className='mb-8 space-y-6'>
            {paymentError ? (
              <div className='rounded-lg border border-red-200 bg-red-50 p-6'>
                <p className='text-red-600'>Failed to load payment details: {paymentError}</p>
              </div>
            ) : paymentData ? (
              <>
                {/* 기본 결제 정보 */}
                <div className='rounded-lg border border-gray-200 bg-white p-6'>
                  <h2 className='mb-4 text-xl font-semibold text-gray-900'>Payment Summary</h2>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='space-y-3'>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Payment Intent ID:</span>
                        <span className='font-mono text-sm text-gray-900'>{paymentData.id}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Request ID:</span>
                        <span className='font-mono text-sm text-gray-900'>
                          {paymentData.request_id}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Status:</span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            paymentData.status === 'SUCCEEDED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {paymentData.status}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Amount:</span>
                        <span className='font-semibold text-gray-900'>
                          {paymentData.currency} {paymentData.amount}
                        </span>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Captured Amount:</span>
                        <span className='font-semibold text-green-600'>
                          {paymentData.currency} {paymentData.captured_amount}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Merchant Order ID:</span>
                        <span className='font-mono text-sm text-gray-900'>
                          {paymentData.merchant_order_id}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Created:</span>
                        <span className='text-sm text-gray-900'>
                          {new Date(paymentData.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-600'>Updated:</span>
                        <span className='text-sm text-gray-900'>
                          {new Date(paymentData.updated_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 최신 결제 시도 정보 */}
                {paymentData.latest_payment_attempt && (
                  <div className='rounded-lg border border-gray-200 bg-white p-6'>
                    <h2 className='mb-4 text-xl font-semibold text-gray-900'>
                      Latest Payment Attempt
                    </h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Attempt ID:</span>
                          <span className='font-mono text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.id}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Status:</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              paymentData.latest_payment_attempt.status === 'SETTLED'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {paymentData.latest_payment_attempt.status}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Amount:</span>
                          <span className='font-semibold text-gray-900'>
                            {paymentData.latest_payment_attempt.currency}{' '}
                            {paymentData.latest_payment_attempt.amount}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Captured Amount:</span>
                          <span className='font-semibold text-green-600'>
                            {paymentData.latest_payment_attempt.currency}{' '}
                            {paymentData.latest_payment_attempt.captured_amount}
                          </span>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>
                            Provider Transaction ID:
                          </span>
                          <span className='font-mono text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.provider_transaction_id}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Authorization Code:</span>
                          <span className='font-mono text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.authorization_code}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Settle Via:</span>
                          <span className='text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.settle_via}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Created:</span>
                          <span className='text-sm text-gray-900'>
                            {new Date(
                              paymentData.latest_payment_attempt.created_at,
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 카드 정보 */}
                {paymentData.latest_payment_attempt?.payment_method?.card && (
                  <div className='rounded-lg border border-gray-200 bg-white p-6'>
                    <h2 className='mb-4 text-xl font-semibold text-gray-900'>Card Information</h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Brand:</span>
                          <span className='text-sm text-gray-900 capitalize'>
                            {paymentData.latest_payment_attempt.payment_method.card.brand}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Last 4 Digits:</span>
                          <span className='font-mono text-sm text-gray-900'>
                            **** {paymentData.latest_payment_attempt.payment_method.card.last4}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Expiry:</span>
                          <span className='text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.payment_method.card.expiry_month}/
                            {paymentData.latest_payment_attempt.payment_method.card.expiry_year}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Card Type:</span>
                          <span className='text-sm text-gray-900 capitalize'>
                            {paymentData.latest_payment_attempt.payment_method.card.card_type}
                          </span>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Issuer:</span>
                          <span className='text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.payment_method.card.issuer_name}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Country:</span>
                          <span className='text-sm text-gray-900'>
                            {
                              paymentData.latest_payment_attempt.payment_method.card
                                .issuer_country_code
                            }
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Commercial:</span>
                          <span className='text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.payment_method.card.is_commercial
                              ? 'Yes'
                              : 'No'}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>BIN:</span>
                          <span className='font-mono text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.payment_method.card.bin}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 인증 및 보안 정보 */}
                {paymentData.latest_payment_attempt?.authentication_data && (
                  <div className='rounded-lg border border-gray-200 bg-white p-6'>
                    <h2 className='mb-4 text-xl font-semibold text-gray-900'>
                      Security & Authentication
                    </h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>CVC Result:</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              paymentData.latest_payment_attempt.authentication_data.cvc_result ===
                              'matched'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {paymentData.latest_payment_attempt.authentication_data.cvc_result}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>CVC Code:</span>
                          <span className='font-mono text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.authentication_data.cvc_code}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>AVS Result:</span>
                          <span className='text-sm text-gray-900 capitalize'>
                            {paymentData.latest_payment_attempt.authentication_data.avs_result.replace(
                              '_',
                              ' ',
                            )}
                          </span>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Fraud Action:</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              paymentData.latest_payment_attempt.authentication_data.fraud_data
                                .action === 'ACCEPT'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {
                              paymentData.latest_payment_attempt.authentication_data.fraud_data
                                .action
                            }
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Risk Score:</span>
                          <span className='text-sm text-gray-900'>
                            {
                              paymentData.latest_payment_attempt.authentication_data.fraud_data
                                .score
                            }
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-gray-600'>Risk Factors:</span>
                          <span className='text-sm text-gray-900'>
                            {paymentData.latest_payment_attempt.authentication_data.fraud_data
                              .risk_factors.length > 0
                              ? paymentData.latest_payment_attempt.authentication_data.fraud_data.risk_factors.join(
                                  ', ',
                                )
                              : 'None'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <div className='animate-pulse space-y-4'>
                  <div className='h-4 w-1/4 rounded bg-gray-200'></div>
                  <div className='space-y-2'>
                    <div className='h-4 rounded bg-gray-200'></div>
                    <div className='h-4 w-3/4 rounded bg-gray-200'></div>
                    <div className='h-4 w-1/2 rounded bg-gray-200'></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className='space-y-4 text-center'>
          <LocaleLink
            href='/'
            className='inline-block w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700'
          >
            Return to Home
          </LocaleLink>

          <LocaleLink
            href='/payment-test'
            className='inline-block w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50'
          >
            Test Another Payment
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
