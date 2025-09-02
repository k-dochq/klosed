import { AirwallexAuthResponse } from '../../entities/types';
import { apiRequest } from 'shared/lib';

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
    const response = await apiRequest(`${this.baseUrl}/api/v1/authentication/login`, {
      method: 'POST',
      headers: {
        'x-client-id': this.clientId,
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Airwallex authentication failed');
    }

    const authData: AirwallexAuthResponse = await response.json();
    return authData.token;
  }
}
