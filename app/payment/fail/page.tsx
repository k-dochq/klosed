import { LocaleLink } from 'shared/ui/locale-link';

export default function PaymentFailPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-md text-center'>
        <div className='mb-6'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <svg
              className='h-8 w-8 text-red-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-gray-900'>Payment Failed</h1>
          <p className='mt-2 text-gray-600'>
            Your payment could not be processed. Please try again.
          </p>
        </div>

        <div className='space-y-4'>
          <LocaleLink
            href='/payment-test'
            className='inline-block w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700'
          >
            Try Again
          </LocaleLink>

          <LocaleLink
            href='/'
            className='inline-block w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50'
          >
            Return to Home
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
