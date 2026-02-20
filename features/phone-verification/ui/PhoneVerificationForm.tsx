'use client';

import { useTimer } from 'features/phone-verification/model/useTimer';
import { usePhoneVerificationState } from 'features/phone-verification/model/usePhoneVerificationState';
import { usePhoneVerificationActions } from 'features/phone-verification/model/usePhoneVerificationActions';
import {
  formatPhoneNumber,
  validatePhoneVerificationForm,
} from 'features/phone-verification/model/phoneVerificationValidators';
import { PhoneVerificationStep } from './PhoneVerificationStep';
import { CodeVerificationStep } from './CodeVerificationStep';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface PhoneVerificationFormProps {
  dict: {
    title: string;
    subtitle: string;
    phoneInput: {
      label: string;
      placeholder: string;
      sendCode: string;
    };
    verificationCode: {
      label: string;
      placeholder: string;
      resendCode: string;
    };
    verifyButton: string;
    skipButton: string;
    continueButton: string;
  };
  userId?: string;
  email?: string;
}

export function PhoneVerificationForm({ dict, userId, email }: PhoneVerificationFormProps) {
  // 상태 관리
  const { state, actions } = usePhoneVerificationState();

  // API 액션
  const { sendVerificationCode, verifyPhoneCode, resendVerificationCode } =
    usePhoneVerificationActions();

  // 라우터 (다국어 지원)
  const router = useLocalizedRouter();

  // 타이머
  const timer = useTimer({
    initialTime: 180,
    onComplete: () => {
      // 타이머 완료 시 처리
    },
  });

  const handleSendCode = async () => {
    const fullPhoneNumber = formatPhoneNumber(state.selectedCountryCode, state.phoneNumber);

    // 폼 검증
    const validation = validatePhoneVerificationForm(fullPhoneNumber);
    if (!validation.isValid) {
      actions.setErrorMessage(validation.errors.phoneNumber || 'Invalid phone number.');
      return;
    }

    actions.setLoading(true);
    actions.setErrorMessage(null);
    actions.setSuccess(null);

    const result = await sendVerificationCode(fullPhoneNumber);

    if (result.success) {
      actions.setSuccess(
        'Verification code sent. Please enter the 6-digit code sent to your phone.',
      );
      actions.nextStep();
      timer.startTimer();
    } else {
      actions.setErrorMessage(result.error!);
    }

    actions.setLoading(false);
  };

  const handleVerify = async () => {
    const fullPhoneNumber = formatPhoneNumber(state.selectedCountryCode, state.phoneNumber);

    // 폼 검증
    const validation = validatePhoneVerificationForm(fullPhoneNumber, state.verificationCode);
    if (!validation.isValid) {
      const errorMessage = validation.errors.verificationCode || validation.errors.phoneNumber;
      actions.setErrorMessage(errorMessage || 'Invalid input.');
      return;
    }

    actions.setLoading(true);
    actions.setErrorMessage(null);
    actions.setSuccess(null);

    const result = await verifyPhoneCode(fullPhoneNumber, state.verificationCode);

    if (result.success) {
      actions.setSuccess('Phone verification completed successfully!');
      console.log('휴대폰 인증 성공:', result.data);

      // 인증 성공 시 홈페이지로 이동
      router.push('/');
    } else {
      actions.setErrorMessage(result.error!);
    }

    actions.setLoading(false);
  };

  const handleSkip = () => {
    // TODO: 건너뛰기 로직 구현
    console.log('휴대폰 인증 건너뜀:', { userId, email });
  };

  const handleResend = async () => {
    const fullPhoneNumber = formatPhoneNumber(state.selectedCountryCode, state.phoneNumber);

    actions.setLoading(true);
    actions.setErrorMessage(null);

    const result = await resendVerificationCode(fullPhoneNumber);

    if (result.success) {
      timer.startTimer();
    } else {
      actions.setErrorMessage(result.error!);
    }

    actions.setLoading(false);
  };

  const handleBackToPhone = () => {
    actions.prevStep();
    timer.stopTimer();
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* 메인 콘텐츠 */}
      <div className='flex flex-1 flex-col items-center justify-center px-6'>
        <div className='w-full max-w-md space-y-8'>
          {/* 아이콘 플레이스홀더 */}
          <div className='flex justify-center'>
            <div className='h-16 w-16 rounded-full bg-gray-200'></div>
          </div>

          {/* 환영 메시지 */}
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900'>{dict.title}</h1>
            <p className='mt-2 text-lg font-semibold text-gray-900'>{dict.subtitle}</p>
          </div>

          {/* 에러 메시지 표시 */}
          {state.error && (
            <div className='w-full max-w-md rounded-lg bg-red-50 p-4 text-center'>
              <p className='text-sm text-red-600'>{state.error}</p>
            </div>
          )}

          {/* 성공 메시지 표시 */}
          {state.successMessage && (
            <div className='w-full max-w-md rounded-lg bg-green-50 p-4 text-center'>
              <p className='text-sm text-green-600'>{state.successMessage}</p>
            </div>
          )}

          {state.step === 'phone' ? (
            <PhoneVerificationStep
              dict={dict}
              selectedCountryCode={state.selectedCountryCode}
              phoneNumber={state.phoneNumber}
              onCountryCodeChange={actions.setSelectedCountryCode}
              onPhoneNumberChange={actions.setPhoneNumber}
              onSendCode={handleSendCode}
              isLoading={state.isLoading}
            />
          ) : (
            <CodeVerificationStep
              dict={dict}
              verificationCode={state.verificationCode}
              timerFormattedTime={timer.formattedTime}
              isTimerActive={timer.isActive}
              onVerificationCodeChange={actions.setVerificationCode}
              onResend={handleResend}
              onBackToPhone={handleBackToPhone}
              onVerify={handleVerify}
              isLoading={state.isLoading}
            />
          )}
        </div>
      </div>

      {/* 건너뛰기 버튼 */}
      <div className='px-6 pb-8'>
        <button
          type='button'
          onClick={handleSkip}
          className='w-full py-2 text-center text-sm text-gray-600 underline hover:text-gray-900'
        >
          {dict.skipButton}
        </button>
      </div>
    </div>
  );
}
