import { NextRequest } from 'next/server';
import { formatSuccessResponse, formatErrorResponse, routeErrorLogger } from 'shared/lib';
import { INVITE_CODE_ERROR_CODES } from 'shared/config/error-codes';
import { ValidateInviteCodeUseCase } from 'features/invitation-code/api/use-cases/validate-invite-code';
import { InviteCodeValidator } from 'features/invitation-code/api/entities/validators';

export async function POST(request: NextRequest) {
  const endpoint = '/api/invite/validate';
  const method = 'POST';

  try {
    const body = await request.json();

    const validation = InviteCodeValidator.validate(body);

    if (!validation.success) {
      return formatErrorResponse(validation.error!, undefined, 400);
    }

    const { code } = validation.data!;

    const useCase = new ValidateInviteCodeUseCase();
    const validationResult = await useCase.execute(code);

    if (!validationResult.isValid) {
      return formatErrorResponse(validationResult.errorCode!, undefined, 400);
    }

    return formatSuccessResponse(validationResult.inviteCode);
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return formatErrorResponse(INVITE_CODE_ERROR_CODES.SERVER_ERROR, requestId, 500);
  }
}
