import { PaymentButton } from 'features/payment';

export default function PaymentTestPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Payment Test Page</h1>

      <div className='mx-auto max-w-md space-y-6'>
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-xl font-semibold'>Test Payment</h2>
          <PaymentButton amount={10.99} currency='USD' />
        </div>
      </div>
    </div>
  );
}
