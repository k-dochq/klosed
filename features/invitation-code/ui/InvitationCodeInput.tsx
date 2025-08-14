interface InvitationCodeInputProps {
  invitationCode: string;
  onCodeChange: (value: string) => void;
}

export function InvitationCodeInput({ invitationCode, onCodeChange }: InvitationCodeInputProps) {
  return (
    <div className='my-6 rounded-lg border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-50/50 to-amber-50/50 p-4 sm:p-6'>
      <div className='text-center'>
        <p className='mb-3 text-xs font-medium text-gray-700 sm:text-sm'>
          Enter Your Exclusive Invitation Code
        </p>
        <div className='mx-auto max-w-xs'>
          <input
            type='text'
            placeholder='BEAUTY2024'
            value={invitationCode}
            onChange={(e) => onCodeChange(e.target.value)}
            maxLength={12}
            className='w-full rounded-md border border-yellow-400/40 bg-white px-4 py-2 text-center font-mono text-sm tracking-widest text-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none'
          />
        </div>
        <p className='mt-2 text-xs text-gray-500'>Code required for package activation</p>
      </div>
    </div>
  );
}
