import { PaymentButton } from 'features/payment';

export default function PaymentTestPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Payment Test Page</h1>

      <div className='mx-auto max-w-md space-y-6'>
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-xl font-semibold'>Multi-Currency Payment Test</h2>
          <p className='mb-6 text-sm text-gray-600'>
            Select your preferred currency and complete the payment using Airwallex. Amounts are
            automatically converted based on current exchange rates.
          </p>
          <PaymentButton amount={10.99} defaultCurrency='USD' />
        </div>

        <div className='rounded-lg bg-blue-50 p-4'>
          <h3 className='mb-2 text-sm font-medium text-blue-900'>Supported Currencies</h3>
          <ul className='space-y-1 text-xs text-blue-700'>
            <li>🇺🇸 USD - US Dollar</li>
            <li>🇹🇭 THB - Thai Baht</li>
            <li>🇰🇷 KRW - Korean Won</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
