import { LogoPlaceholder } from './LogoPlaceholder';
import { InviteTitle } from './InviteTitle';
import { InviteInstructions } from './InviteInstructions';
import { InviteCodeInput } from './InviteCodeInput';
import { NoCodeLink } from './NoCodeLink';
import { ActionButtons } from './ActionButtons';

interface InviteCodeFormProps {
  dict: {
    title: string;
    instructions: {
      line1: string;
      line2: string;
    };
    input: {
      placeholder: string;
    };
    noCode: string;
    buttons: {
      cancel: string;
      continue: string;
    };
  };
}

export function InviteCodeForm({ dict }: InviteCodeFormProps) {
  return (
    <div className='flex w-full flex-col items-center space-y-10 pb-24'>
      <LogoPlaceholder />
      <div className='space-y-4'>
        <InviteTitle title={dict.title} />
        <InviteInstructions instructions={dict.instructions} />
      </div>
      <div className='w-full space-y-6'>
        <InviteCodeInput placeholder={dict.input.placeholder} />
        <NoCodeLink text={dict.noCode} />
      </div>
      <ActionButtons buttons={dict.buttons} />
    </div>
  );
}
