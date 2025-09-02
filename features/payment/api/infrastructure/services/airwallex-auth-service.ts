import { AirwallexAuthResponse } from '../../entities/types';

export class AirwallexAuthService {
  private readonly baseUrl: string;
  private readonly clientId: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = process.env.AIRWALLEX_BASE_URL!;
    this.clientId = process.env.AIRWALLEX_CLIENT_ID!;
    this.apiKey = process.env.AIRWALLEX_API_KEY!;
  }

  async authenticate(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/v1/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-client-id': this.clientId,
        'x-api-key': this.apiKey,
      }),
    });

    if (!response.ok) {
      throw new Error('Airwallex 인증 실패');
    }

    const authData: AirwallexAuthResponse = await response.json();
    return authData.token;
  }
}
