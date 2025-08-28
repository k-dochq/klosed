import { IEmailApiService } from '../../entities/types';

/**
 * Resend API를 사용한 이메일 서비스 구현체
 */
export class EmailApiService implements IEmailApiService {
  private readonly apiUrl = 'https://api.resend.com/emails';

  async sendVerificationEmail(
    email: string,
    subject: string,
    htmlContent: string,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return {
        success: false,
        error: 'Email service is not configured',
      };
    }

    try {
      const emailData = {
        from: 'Klosed <noreply@klosed.com>',
        to: [email],
        subject,
        html: htmlContent,
      };

      const response = await fetch(this.apiUrl, {
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
        messageId: result.id,
      };
    } catch (error) {
      console.error('Error sending verification email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
