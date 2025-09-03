import { LocaleLink } from 'shared/ui/locale-link';
import { PaymentIntentDetails } from 'features/payment/ui/PaymentIntentDetails';

interface PageProps {
  searchParams: Promise<{ id?: string; type?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { id, type } = await searchParams;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-2xl'>
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
          <div className='mb-8'>
            <PaymentIntentDetails paymentIntentId={id} />
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
