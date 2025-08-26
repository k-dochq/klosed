interface InviteInstructionsProps {
  instructions: {
    line1: string;
    line2: string;
  };
}

export function InviteInstructions({ instructions }: InviteInstructionsProps) {
  return (
    <div className='space-y-1 text-center'>
      <p className='text-lg font-medium text-gray-700'>{instructions.line1}</p>
      <p className='text-lg font-medium text-gray-700'>{instructions.line2}</p>
    </div>
  );
}
