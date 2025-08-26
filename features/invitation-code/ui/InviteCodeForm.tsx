import { LogoPlaceholder } from './LogoPlaceholder';
import { InviteTitle } from './InviteTitle';
import { InviteInstructions } from './InviteInstructions';
import { InviteCodeInput } from './InviteCodeInput';
import { NoCodeLink } from './NoCodeLink';
import { ActionButtons } from './ActionButtons';

export function InviteCodeForm() {
  return (
    <div className='flex w-full flex-col items-center space-y-10 pb-24'>
      <LogoPlaceholder />
      <div className='space-y-4'>
        <InviteTitle />
        <InviteInstructions />
      </div>
      <div className='w-full space-y-6'>
        <InviteCodeInput />
        <NoCodeLink />
      </div>
      <ActionButtons />
    </div>
  );
}
