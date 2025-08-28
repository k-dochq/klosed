import { IEmailApiService } from '../entities/types';
import {
  SendVerificationEmailUseCaseRequest,
  SendVerificationEmailUseCaseResponse,
  EMAIL_VERIFICATION_ERROR_CODES,
} from '../entities/types';
import { validateEmail } from '../entities/schemas';
import { EMAIL_TEMPLATES } from 'shared/config';

/**
 * 이메일 발송 Use Case
 */
export class SendVerificationEmailUseCase {
  constructor(private readonly emailApiService: IEmailApiService) {}

  async execute(
    request: SendVerificationEmailUseCaseRequest,
  ): Promise<SendVerificationEmailUseCaseResponse> {
    try {
      const { email } = request;

      // 1. 이메일 형식 검증
      const emailValidation = validateEmail(email);
      if (!emailValidation.success) {
        return {
          success: false,
          error: EMAIL_VERIFICATION_ERROR_CODES.INVALID_EMAIL_FORMAT,
        };
      }

      // 2. 이메일 템플릿 생성 (간단한 테스트용)
      const subject = EMAIL_TEMPLATES.verification.subject;
      const htmlContent = this.generateEmailHtml(email);

      // 3. 이메일 발송
      const emailResult = await this.emailApiService.sendVerificationEmail(
        email,
        subject,
        htmlContent,
      );

      if (!emailResult.success) {
        console.error('Email sending failed:', emailResult.error);
        return {
          success: false,
          error: EMAIL_VERIFICATION_ERROR_CODES.EMAIL_SEND_FAILED,
        };
      }

      console.log('Email sent successfully:', {
        email,
        messageId: emailResult.messageId,
      });

      return {
        success: true,
        data: {
          messageId: emailResult.messageId!,
          expiresAt: new Date(), // 더미 데이터
          verificationLink: 'https://example.com', // 더미 데이터
        },
      };
    } catch (error) {
      console.error('SendVerificationEmailUseCase error:', error);
      return {
        success: false,
        error: EMAIL_VERIFICATION_ERROR_CODES.UNKNOWN_ERROR,
      };
    }
  }

  private generateEmailHtml(email: string): string {
    const username = email.split('@')[0] || 'there';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Email from Klosed</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Klosed</div>
            <h1>Test Email</h1>
          </div>

          <div>
            <p>Hi ${username}!</p>
            <p>This is a test email sent to <strong>${email}</strong>.</p>
            <p>If you received this email, the email sending functionality is working correctly!</p>
          </div>

          <div class="footer">
            <p>Test email from Klosed system.</p>
            <p>&copy; 2024 Klosed. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
