export interface InviteCodeData {
  id: number;
  code: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  expiresAt?: string;
}

export interface InviteCodeValidationResult {
  isValid: boolean;
  errorCode?: string;
  inviteCode?: InviteCodeData;
}
