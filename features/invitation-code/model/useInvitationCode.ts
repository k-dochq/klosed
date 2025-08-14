import { useState } from 'react';

export function useInvitationCode() {
  const [invitationCode, setInvitationCode] = useState('');

  const handleCodeChange = (value: string) => {
    setInvitationCode(value.toUpperCase());
  };

  return {
    invitationCode,
    handleCodeChange,
  };
}
