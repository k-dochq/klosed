import { type SendVerificationEmailRequest, type SendVerificationEmailResponse } from './types';
import { generateVerificationLink } from './emailTokenUtils';
import { RESEND_CONFIG, EMAIL_TEMPLATES } from 'shared/config';

/**
 * Resend API를 사용한 이메일 발송 서비스
 */

/**
 * 이메일 인증 메일 발송
 */
export async function sendVerificationEmail(
  request: SendVerificationEmailRequest,
): Promise<SendVerificationEmailResponse> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return {
      success: false,
      error: 'Email service is not configured',
    };
  }

  try {
    const verificationLink = await generateVerificationLink(request.email);

    const emailData = {
      from: RESEND_CONFIG.defaultFrom,
      to: [request.email],
      subject: EMAIL_TEMPLATES.verification.subject,
      html: generateVerificationEmailHtml(verificationLink, request.email),
    };

    const response = await fetch(RESEND_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return {
        success: false,
        error: errorData.message || 'Failed to send verification email',
      };
    }

    const result = await response.json();

    console.log('Verification email sent successfully:', result.id);

    return {
      success: true,
      data: {
        messageId: result.id,
      },
    };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * 이메일 인증 메일 HTML 템플릿 생성
 */
function generateVerificationEmailHtml(verificationLink: string, email: string): string {
  // 이메일 주소에서 사용자명 추출 (@ 앞 부분)
  const username = email.split('@')[0] || 'there';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Complete Your Klosed Account Setup</title>
      <style>
        body {
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 30px;
        }
        .content {
          margin-bottom: 30px;
        }
        .button {
          display: inline-block;
          background-color: #0088ff;
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 600;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #0066cc;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
          font-size: 14px;
          color: #856404;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Klosed</div>
          <h1 class="title">Welcome to Klosed!</h1>
          <p class="subtitle">Complete your account setup to start exploring amazing experiences.</p>
        </div>

        <div class="content">
          <p>Hi ${username}!</p>
          <p>Thank you for signing up for Klosed with <strong>${email}</strong>. To complete your account setup and start booking amazing experiences, please verify your email address.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" class="button">Complete Account Setup</a>
          </div>

          <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #0088ff;">${verificationLink}</p>
        </div>

        <div class="warning">
          <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
        </div>

        <div class="footer">
          <p>If you didn't create an account with Klosed, please ignore this email.</p>
          <p>&copy; 2024 Klosed. All rights reserved.</p>
          <p>Customer Service: <a href="mailto:cs@klosed.kr">cs@klosed.kr</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
